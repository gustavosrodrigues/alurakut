import { SiteClient} from 'datocms-client'; 

// API bff (Backend For Front-end)
export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') { //Certifica que o request é do tipo POST, pois o padrão é GET
        const TOKEN = '6b50d4bcb1b7f021e7064cd270c42b';
        const client = new SiteClient(TOKEN); // inicializando o client 

        // Criando um novo registro de Community (Comunidade)
        const registroCriado = await client.items.create({ //Certifica que o registro vai ser feito ]
            itemType: "972015", //model ID vindo do modelo do BD //necessário "," separando linhas
            ...request.body, //recuperamos as informações do formulário
            // Somente as informações inseridas aqui seriam gravadas no BD, não é o esperado
            /* title: "",
            imageUrl: "",
            linkUrl: "",
            creatorSlug: "" */
        });

        console.log(registroCriado); // Não vai aparecer no browser
        response.json({ // Dados são gerados no servidor api BFF
            dados: 'Algum dado qualquer', //necessário "," separando linhas
            registroCriado: registroCriado,
        })
        return;
    }
}