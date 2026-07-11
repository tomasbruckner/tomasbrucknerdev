---
title: 'Moderní testování Web API pomocí snapshotů v .NET Core 3'
description: 'Praktický návod na rychlé in-memory testování Web API v .NET Core 3 — jak si připravit WebApplicationFactory, zapojit in-memory databázi, obejít JWT autentizaci, seřadit testy a ověřovat odpovědi pomocí snapshot testů.'
pubDate: 2020-04-06
tags: ['dotnet', 'testing']
---

![Ilustrace testování API — centrální monitor s nápisem API propojený s notebookem, tabletem a telefonem](../../../assets/blog/snapshot-testing-dotnet-core/cover.jpeg)

Když jsem si poprvé začal hrát s testováním API v .NET Core 3, chtěl jsem mít rychlý in-memory test API, který dělá snapshoty. V tomto článku popíšu, jak na to jít snadno, abyste to zvládli i vy ve svém projektu. Pokud snapshot testování neznáte a nevíte, proč by vás mělo zajímat, vysvětlím to níže.

## Třída WebApplicationFactory

Tohle je jádro vašeho testování API. Tady můžete nahradit své služby mocky, nastavit in-memory databázi nebo vypnout autentizaci. Jak ji nakonfigurovat, rozeberu podrobněji, ale pokud chcete rovnou vidět kód, celou třídu najdete [zde](https://github.com/tomasbruckner/web-api-testing/blob/master/Example.Api.Tests/Support/Utils/CustomWebApplicationFactoryWithInMemoryDb.cs).

## In-memory databáze

In-memory databáze je skvělý nástroj pro rychlé testování a snadné nastavení. Výhodou jejího použití spolu s **IClassFixtures** a **WebApplicationFactory** je, že pro každou testovací třídu vloží novou in-memory databázi. To znamená, že testy ve stejné třídě databázi sdílejí, ale testy v různých třídách nikoli. In-memory databázi nastavíte takto:

```csharp
var serviceProvider = new ServiceCollection()
    .AddEntityFrameworkInMemoryDatabase()
    .BuildServiceProvider();

services.AddDbContext<RepositoryContext>(
    options =>
    {
        options.UseInMemoryDatabase(TestDbName)
            .ConfigureWarnings(
                x => x.Ignore(InMemoryEventId.TransactionIgnoredWarning)
            );
        options.UseInternalServiceProvider(serviceProvider);
    }
);
```

Tímto způsobem získáte pro každou třídu izolované prostředí. Díky tomu můžete všechny třídy spouštět současně, takže celá testovací sada proběhne o dost rychleji. Pokud nepoužíváte žádné složité SQL funkce, in-memory databáze by měla stačit, ale mějte na paměti, že in-memory databáze bude mít vždycky svá omezení.

## Obcházení JWT autentizace

V moderních Web API projektech je docela běžné používat JWT autentizaci. Při testování se nechcete přihlašovat pro každý test zvlášť. Jen to zbytečně zpomaluje samotné testování. Navíc vaše tokeny může generovat jiná aplikace, která není součástí testování.

Z těchto důvodů možná budete chtít validaci podpisu JWT tokenu prostě ignorovat. Uděláte to snadno takto:

```csharp
services.PostConfigure<JwtBearerOptions>(
    JwtBearerDefaults.AuthenticationScheme,
    options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            SignatureValidator = (token, parameters) => new JwtSecurityToken(token),
            ValidateIssuer = false,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = false,
            ValidateAudience = false
        };
    }
);
```

## Řazení podle priority

Ve svém projektu možná budete chtít také spouštět testy v rámci jedné třídy v určitém pořadí. Bohužel v knihovně xUnit pořadí nastavit nelze. U unit testů to dává smysl, ale u integračních testů to nutně neplatí. Obvykle chcete v prvním testu ověřit, že dokážete vytvořit entitu. Ve druhém testu, že ji dokážete upravit/smazat, a tak dále.

Proto jsem vytvořil jednoduchý nástroj, který vám umožní spouštět testy v pořadí, jaké chcete. Najdete ho [zde](https://github.com/tomasbruckner/web-api-testing/blob/master/Example.Api.Tests/Support/Utils/PriorityOrderer.cs). Umožňuje přidat k testům atribut **TestOrder(int)** takto:

```csharp
[Fact, TestOrder(1)]
public async void T01CreateUser()
{
		// ...
}
```

Když testy ve třídě spustíte, začne se od nižších čísel v atributu a pokračuje se nahoru. Nejdřív se tedy spustí test s číslem 1, pak 2 (až 1 dokončí) a tak dále. Díky tomu máte svůj scénář pod kontrolou.

Doporučuji pojmenovávat metody tak, abyste poznali, která je první, druhá atd. Já název metody prefixuji písmenem T (jako Test) a číslem, např. **T01CreateUser**.

![xUnit orderer spouštějící testy v nastaveném pořadí](../../../assets/blog/snapshot-testing-dotnet-core/test-orderer.png)

## Snapshot testování

Co je tedy snapshot testování přesně? Podívejme se na příklad. Snapshot test vypadá takto:

```csharp
[Fact]
public async void GetUser()
{
	var request = TestUtils.CreateGetRequest("api/user/1");
	var entity = await TestUtils.SendOkRequest(_client, request);
	entity.ShouldMatchSnapshot();
}
```

Důležitá část je tady **entity.ShouldMatchSnapshot()**. Jde o extension metodu z knihovny [JestDotnet](https://www.nuget.org/packages/JestDotnet). Disclaimer: je to moje vlastní knihovna. V .NET existuje několik knihoven, které dělají totéž, ale všem chyběly nějaké funkce, které jsem potřeboval, a tak jsem se rozhodl napsat vlastní. Klidně se podívejte na jiné knihovny, nebo mi na Githubu pošlete feature request, pokud vám něco chybí.

Knihovna funguje takto. Když test spustíte poprvé, automaticky vygeneruje snapshot s JSONem toho, co endpoint vrátil, například takto:

```json
{
  "userId": 1,
  "firstName": "Michael",
  "lastName": "Fritz",
  "age": 22,
  "roleId": 2
}
```

Když test spustíte podruhé, porovná výstup testu se snapshotem. Pokud se výstup liší, vyhodí se výjimka a test selže. Výstup vám ukáže diff mezi tím, co se očekávalo, a skutečným výsledkem. Např. očekávaný atribut age byl 22, ale skutečný age byl 24:

```text
JestDotnet.Core.Exceptions.SnapshotMismatch : {
  "age": [
    22,
    24
  ]
}
```

Kde se skutečná síla knihovny naplno projeví, je **hromadná aktualizace testů**. Představte si, že do response entity přidáte novou property. Teď všechny testy, které tuto entitu kontrolují, selžou, protože jim ve snapshotech tato property chybí. Tyto selhávající testy ale můžete spustit s proměnnou prostředí **UPDATE=true** a ono to automaticky aktualizuje všechny selhávající testy, které jste spustili. Pokud chcete aktualizovat jen jeden test, stačí spustit pouze tento jediný test a proměnnou **UPDATE** zase zrušit (nebo ji nastavit na false).

Proměnnou prostředí pro test runner nastavíte v Rideru takto:

![Nastavení proměnné prostředí UPDATE pro test runner v JetBrains Rideru](../../../assets/blog/snapshot-testing-dotnet-core/rider-env-vars.png)

Užitečné je také to, že když test spustíte v prostředí Continuous Integration a snapshot chybí, snapshot se nevygeneruje a test místo toho selže. To se hodí, když testy spouštíte v Gitlab CI, Github Actions apod.

Myšlenka snapshot testování pochází ze skvělé knihovny [Jest](https://jestjs.io). Více o snapshot testování v JavaScriptu si můžete přečíst [zde](https://jestjs.io/docs/en/snapshot-testing).

## Závěr

Chtěl jsem všechny povzbudit, aby ve svém projektu začali s testováním API. Jsou to zdaleka nejsnáze nastavitelné a udržovatelné testy. Nebo aspoň můžou být, pokud na to použijete správné nástroje.

Celý projekt s in-memory testováním a snapshoty najdete na mém [Githubu](https://github.com/tomasbruckner/web-api-testing).
