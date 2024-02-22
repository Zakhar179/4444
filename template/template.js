const toolTemplate = `
    <h2>Инструменты</h2>
    <ul>
        {{#each tools}}
        <li>ID: {{id}}</li>
        <li>Наименование: {{name}}</li>
        <li>Страна производства: {{country}}</li>
        <li>Цена: {{price}}</li>
        {{/each}}
    </ul>
`;
