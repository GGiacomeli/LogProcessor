# Log-Processor

---

Solução do problema proposto pela MelhorEnvio [aqui](https://github.com/GGiacomeli/LogProcessor/blob/main/DESCRIPTION.md)

---

### Dependencias

- `NodeJS 16.5.0 `
  - `pg(node-postgres)`
  - `dotenv`
  - `fast-csv`
  - `sequelize`
- `PostgreSQL`

---

#### Passos

- Atualizar o arquivo .env presente na pasta src/config com as suas credenciais para o banco de dados.
- inserir o arquivo logs.txt na pasta input
- Executar o comando `npm install` para instalar as dependencias utilizadas.
- Executar o comando `npx sequelize db:migrate`.
- Executar o comando `npm run ProcessFile` para extrair e salvar os dados pertinentes contidos no arquivo [logs.txt](https://drive.google.com/open?id=1GliYD4Q19_f6S88iFsn0dk8dGLhB9YXF).
- Executar o comando `npm run GenerateReports` para gerar os relatórios presente nos requisitos (consumerPerService, consumerRequests, avgLatenciesPerService )

---

##### Considerações sobre os requisitos

Ao análisar a stack utilizada pela empresa optei por utilizar javascript/nodejs.
Para o banco de dados, apesar da stack utilizar MySQL optei pelo postgres, por possuir mais familiaridade com o mesmo.
O arquivo [logs.txt](https://drive.google.com/open?id=1GliYD4Q19_f6S88iFsn0dk8dGLhB9YXF) possui diversos atributos que não são utilizados para satisfazer os requistos e os mesmos foram desconsiderados já na extração.
Cada relatório foi gerado separadamente e está presente [aqui](https://github.com/GGiacomeli/LogProcessor/tree/main/reports) caso queira checar somente o resultado.

---

#### Justificativa

Procurei deixar o processo o mais simples e claro possível para ser executado, para tanto o separei em três partes.
Primeiro a de executar as migrations para o banco de dados por meio do sequelize, dessa forma não precisei incluir um script sql para ser executado no cli do postgres(pgsql) ou em uma GUI como o PGAdmin, além de facilitar caso necessite fazer alguma alteração, o sequelize é utilizado **somente** para migrations.
Passando para a parte de analisar e extrair os dados do arquivo logs.txt (espera-se que ele esteja contido dentro da pasta input e nomeado 'logs.txt', mas você pode mudar isso no arquivo ([src/services/fileProcessor.js](https://github.com/GGiacomeli/LogProcessor/blob/main/src/services/fileProcessor.js)) utilizei o pacote fs e readline para ler o arquivo linha a linha e enviar para um método que chama o repositório de inserções([src/repository/insertQueries](https://github.com/GGiacomeli/LogProcessor/blob/main/src/repository/insertQueries.js)), esse respositório foi construido com o auxilio do pacote pg([node-postgres](https://node-postgres.com/)).
Finalmente, para gerar os relatórios foi utilizado um repositorio ([src/repository/reportQueries.js](https://github.com/GGiacomeli/LogProcessor/blob/main/src/repository/reportQueries.js)) e um pacote chamado fast-csv, basicamente cada report dispara uma query e chama uma função helper para criar o csv com o resultado das queries, os arquivos são criados na pasta [/reports](https://github.com/GGiacomeli/LogProcessor/tree/main/reports)

A conexão com o banco foi abstraida e exporta o método pool.query presente no pacote pg.
Existem duas pastas de config, uma na pasta raiz, que foi criada pelo sequelize e outra dentro da pasta src, que é a unica que precisa ser editada pois possui o arquivo .env.
O código tenta seguir o airbnb style guide, mas foge de algumas recomendações que não estão presentes no ESLint/Prettier.
Procurei focar em entregar os requisitos da melhor forma possivel e não me preocupar com requisitos para plenos/seniors.
Não foi possível fazer o commit do arquivo logs.txt pois possui mais de 100mb.
