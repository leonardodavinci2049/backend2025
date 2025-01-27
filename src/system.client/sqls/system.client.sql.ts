import { SelectClientDto } from '../dto/select.client.dto';

export function findManySql(selectClientDto: SelectClientDto): string {
  const idSystem = selectClientDto.ID_SYSTEM ?? 0;
  const idLoja = selectClientDto.ID_LOJA ?? 0;
  const idDepartamento = selectClientDto.ID_DEPARTAMENTO ?? 0;
  const idUsuario = selectClientDto.ID_USUARIO ?? 0;
  const idUuid = selectClientDto.ID_UUID ?? '';

  const queryString = ` SELECT  
        tbl_system_cfg_cliente.ID_SYSTEM, 
        tbl_system_cfg_cliente.PASSKEY, 
        tbl_system_cfg_cliente.ID_DATABASE, 
        tbl_system_cfg_cliente.ID_TEMPLATE, 
        tbl_system_cfg_cliente.ID_TIPO_CLIENTE, 
        tbl_system_cfg_cliente.NOME_CLIENTE, 

        tbl_system_cfg_cliente.SERVER_IP, 
        tbl_system_cfg_cliente.PORTA_TCP, 
        tbl_system_cfg_cliente.PORTA_HTTP, 

        tbl_system_cfg_cliente.SERVER_USUARIO, 
        tbl_system_cfg_cliente.SERVER_PASSWORD, 

        tbl_system_cfg_cliente.FRMPRINCIPAL_TITLE, 
        tbl_system_cfg_cliente.FRMPRINCIPAL_ABOUT, 
        tbl_system_cfg_cliente.FRMPRINCIPAL_LOGO, 
        tbl_system_cfg_cliente.FRMPRINCIPAL_EMPRESA, 
        tbl_system_cfg_cliente.FRMPRINCIPAL_WALLPAPER, 
        tbl_system_cfg_cliente.FRMPRINCIPAL_EMPRESARIAL, 
        tbl_system_cfg_cliente.AREADOCLIENTE, 

        tbl_system_cfg_cliente.DOMINIO, 
        tbl_system_cfg_cliente.DOMINIO_ATACADO, 
        tbl_system_cfg_cliente.DOMINIO_VAREJO, 
        tbl_system_cfg_cliente.DOMAIN_NAME, 

        tbl_system_cfg_cliente.ECOMMERCE_ATACADO, 
        tbl_system_cfg_cliente.ECOMMERCE_VAREJO, 

        tbl_system_cfg_cliente.WOO_KEY, 
        tbl_system_cfg_cliente.WOO_SECRET, 

        tbl_system_cfg_cliente.DATABASE_PATH, 
        tbl_system_cfg_cliente.DATABASE_USER, 
        tbl_system_cfg_cliente.DATABASE_PASSWORD, 
        tbl_system_cfg_cliente.DATABASE_SERVER, 

        tbl_system_cfg_cliente.PATH_IMG_PRODUCTS_WINDOWS, 
        tbl_system_cfg_cliente.PATH_IMG_CUSTOMERS_WINDOWS, 

        tbl_system_cfg_cliente.LOCAL_IMAGENS_PRODUTO, 
        tbl_system_cfg_cliente.LOCAL_IMAGENS_PESSOAS, 

        tbl_system_cfg_cliente.PASTA_IMG_PRODUCTS, 
        tbl_system_cfg_cliente.PASTA_IMG_CUSTOMERS, 

        tbl_system_cfg_cliente.PATH_ANEXOS_PRODUTO_WINDOWS, 
        tbl_system_cfg_cliente.PATH_ANEXOS_CLIENTE_WINDOWS, 
        tbl_system_cfg_cliente.PATH_ANEXOS_PEDIDO_WINDOWS, 
        tbl_system_cfg_cliente.PATH_ANEXOS_DIVERSOS_WINDOWS, 

        tbl_system_cfg_cliente.LOCAL_ANEXOS_CLIENTE, 
        tbl_system_cfg_cliente.LOCAL_ANEXOS_PRODUTO, 
        tbl_system_cfg_cliente.LOCAL_ANEXOS_PEDIDO, 
        tbl_system_cfg_cliente.LOCAL_ANEXOS_DIVERSOS, 

        tbl_system_cfg_cliente.LOGO1, 
        tbl_system_cfg_cliente.LOGO2, 
        tbl_system_cfg_cliente.LOGO3, 

        tbl_system_cfg_cliente.EMAIL_FOOTER_CONTENT, 

        tbl_system_cfg_cliente.MYSQL_DBHOST, 
        tbl_system_cfg_cliente.MYSQL_DBPORT, 
        tbl_system_cfg_cliente.MYSQL_DBNAME, 
        tbl_system_cfg_cliente.MYSQL_DBUSER, 
        tbl_system_cfg_cliente.MYSQL_DBPASSWORD, 

        tbl_system_cfg_cliente.DESATIVAR, 
        tbl_system_cfg_cliente.ANOTACOES_GERAIS, 
            
        tbl_system_cliente.NOME_EMPRESA, 
        tbl_system_cliente.RAZAO_SOCIAL, 
        tbl_system_cliente.URL_DA_LOGO, 
        tbl_system_cliente.CNPJ1, 
        tbl_system_cliente.CNPJ2, 
        tbl_system_cliente.INSC_EST1, 
        tbl_system_cliente.INSC_EST2, 

        tbl_system_cliente.INSC_MUNICIPAL1, 
        tbl_system_cliente.INSC_MUNICIPAL2, 
        tbl_system_cliente.COD_MUNICIPIO, 

        tbl_system_cliente.EMAIL_COMERCIAL, 
        tbl_system_cliente.EMAIL_VENDAS, 
        tbl_system_cliente.EMAIL_CADASTRO, 
        tbl_system_cliente.EMAIL_FALECONOSCO, 
        tbl_system_cliente.EMAIL_ADMINISTRATIVO, 
        tbl_system_cliente.TELEFONE_COMERCIAL, 

        tbl_system_cliente.FONE1, 
        tbl_system_cliente.FONE2, 
        tbl_system_cliente.FONE3, 
        tbl_system_cliente.EMAIL1, 
        tbl_system_cliente.EMAIL2, 
        tbl_system_cliente.EMAIL3, 

        tbl_system_cliente.CEP, 
        tbl_system_cliente.ENDERECO, 
        tbl_system_cliente.ENDERECO_NUMERO, 
        tbl_system_cliente.COMPLEMENTO, 
        tbl_system_cliente.BAIRRO, 
        tbl_system_cliente.CIDADE, 
        tbl_system_cliente.UF, 
        tbl_system_cliente.REGIAO_PAIS, 
        tbl_system_cliente.PAIS, 
        tbl_system_cliente.ENDERECO_COMPLETO_02, 
        tbl_system_cliente.ENDERECO_COMPLETO_01, 

        tbl_system_cliente.FACEBOOK, 
        tbl_system_cliente.TWITTER, 
        tbl_system_cliente.SKYPE, 

        tbl_system_cliente.WHATSAPP1, 
        tbl_system_cliente.WHATSAPP2, 
        tbl_system_cliente.WHATSAPP3, 

        tbl_system_cliente.PRN1_COL1, 
        tbl_system_cliente.PRN1_COL2, 
        tbl_system_cliente.PRN1_COL3, 
        tbl_system_cliente.PRN2_COL1, 
        tbl_system_cliente.PRN2_COL2, 
        tbl_system_cliente.PRN2_COL3, 

        tbl_system_cliente.PRN_PDV, 
        tbl_system_cliente.PRN_FISCAL, 
        tbl_system_cliente.PRN_CODBARRAS1, 
        tbl_system_cliente.PRN_CODBARRAS2, 
        tbl_system_cliente.PRN1_CODSTR, 
        tbl_system_cliente.ANOTACOES_CLIENTE, 
        tbl_system_cliente.ANOTACOES_IMPRESSORAS, 
            
        tbl_system_parametro.PARAMETRO_01, 
        tbl_system_parametro.PARAMETRO_02, 
        tbl_system_parametro.PARAMETRO_03, 
        tbl_system_parametro.PARAMETRO_04, 
        tbl_system_parametro.PARAMETRO_05, 
        tbl_system_parametro.PARAMETRO_06, 
        tbl_system_parametro.PARAMETRO_07, 
        tbl_system_parametro.PARAMETRO_08, 
        tbl_system_parametro.PARAMETRO_09, 
        tbl_system_parametro.PARAMETRO_10, 

        tbl_system_parametro.PARAMETRO_11, 
        tbl_system_parametro.PARAMETRO_12, 
        tbl_system_parametro.PARAMETRO_13, 
        tbl_system_parametro.PARAMETRO_14, 
        tbl_system_parametro.PARAMETRO_15, 
        tbl_system_parametro.PARAMETRO_16, 
        tbl_system_parametro.PARAMETRO_17, 
        tbl_system_parametro.PARAMETRO_18, 
        tbl_system_parametro.PARAMETRO_19, 
        tbl_system_parametro.PARAMETRO_20, 

        tbl_system_parametro.JSON_CONFIG , 
        tbl_system_parametro.ANOTACOES_PARAMETROS, 
        
        tbl_email_system.NOME_REMETENTE, 
        tbl_email_system.EMAIL_REMETENTE, 
        tbl_email_system.MENSAGEM_CCO, 

        tbl_email_system.USUARIO AS USUARIO_EMAIL, 
        tbl_email_system.SENHA AS SENHA_EMAIL, 

        tbl_email_system.SERVIDOR_POP, 
        tbl_email_system.SERVIDOR_SMTP, 

        tbl_email_system.PORTA_POP3, 
        tbl_email_system.PORTA_PARA_TLS, 
        tbl_email_system.PORTA_PARA_SSL, 

        tbl_email_system.PORTA_SMTP, 
        tbl_email_system.TIPO_EMAIL, 
        tbl_email_system.USAR_AUTENTICACAO, 
        tbl_email_system.TIPO_SSL, 
        tbl_email_system.USAR_SSL, 
        tbl_email_system.ASSINATURA AS ASSINATURA_EMAIL, 

        tbl_email_variables.COMPANY_NAME, 
        tbl_email_variables.COMPANY_ENDERECO, 
        tbl_email_variables.COMPANY_HORARIOS, 

        tbl_email_variables.COMPANY_DOMAIN, 
        tbl_email_variables.COMPANY_URL_AREA_CLIENT, 
        tbl_email_variables.COMPANY_URL_LOGO, 

        tbl_email_variables.COMPANY_TELEFONE_COMERCIAL, 
        tbl_email_variables.COMPANY_EMAIL_COMERCIAL, 
        tbl_email_variables.COMPANY_REGIAO_ATENDIMENTO, 
        tbl_email_variables.COMPANY_PRODUTOS_DESCRICAO, 
        tbl_email_variables.COMPANY_PRODUTOS_MERCADO, 

        tbl_email_variables.TEMPLATE_HTML_HEADER, 
        tbl_email_variables.TEMPLATE_CSS_CODIGO, 
        tbl_email_variables.TEMPLATE_HTML_FOOTER 
    FROM   
        tbl_system_cfg_cliente    
    INNER JOIN  tbl_system_cliente  ON tbl_system_cliente.ID_SYSTEM      =  tbl_system_cfg_cliente.ID_SYSTEM     
    INNER JOIN  tbl_system_parametro  ON tbl_system_parametro.ID_SYSTEM  =  tbl_system_cfg_cliente.ID_SYSTEM 
    INNER JOIN tbl_email_variables ON tbl_email_variables.ID_SYSTEM      = tbl_system_cfg_cliente.ID_SYSTEM     
    INNER JOIN tbl_email_system ON tbl_email_system.ID_SYSTEM            = tbl_system_cfg_cliente.ID_SYSTEM     
  WHERE   1 = 1  
    ${idSystem > 0 ? `AND tbl_system_cfg_cliente.ID_SYSTEM = ${idSystem}` : ''}
    ${idLoja > 0 ? `AND tbl_system_cfg_cliente.ID_LOJA = ${idLoja}` : ''}
    ${idDepartamento > 0 ? `AND tbl_system_cfg_cliente.ID_DEPARTAMENTO = ${idDepartamento}` : ''}
    ${idUsuario > 0 ? `AND tbl_system_cfg_cliente.ID_USUARIO = ${idUsuario}` : ''}
    ${idUuid !== '' ? `AND tbl_system_cfg_cliente.ID_UUID = ${idUuid}` : ''}
    ORDER BY    tbl_system_cfg_cliente.ID_SYSTEM  ASC  limit 100;                                                          
              
`;

  return queryString;
}
