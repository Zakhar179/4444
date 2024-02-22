class ToolManager {
    constructor() {
        this.tools = new Map();
    }

    addTool(id, name, country, price) {
        const tool = {
            id,
            name,
            country,
            price
        };
        this.tools.set(tool.id, tool);
    }

    deleteTool(id) {
        this.tools.delete(id);
    }

    getTool(id) {
        return this.tools.get(id);
    }

    getAllTools() {
        return Array.from(this.tools.values());
    }

    clearForm() {
        document.getElementById('toolForm').reset();
    }
}

class ToolInfoDisplayer {
    constructor(toolManager) {
        this.toolManager = toolManager;
    }

    showAllTools() {
        const tools = this.toolManager.getAllTools();
        this.displayTools(tools);
    }

    showTool(id) {
        const tool = this.toolManager.getTool(id);
        if (tool) {
            this.displayTools([tool]);
        } else {
            this.displayMessage('Инструмент не найден.');
        }
    }

    displayTools(tools) {
        const template = Handlebars.compile(toolTemplate);
        let html = '';
        tools.forEach(tool => {
            html += template({ tools: [tool] }) + '<br>'; // Добавляем пустую строку между каждым инструментом
        });
        document.getElementById('toolInfo').innerHTML = html;
    }

    displayMessage(message) {
        document.getElementById('toolInfo').innerHTML = message;
    }
}

const toolManager = new ToolManager();
const toolInfoDisplayer = new ToolInfoDisplayer(toolManager);

// Подключаем обработчики событий для кнопок после загрузки документа
document.addEventListener("DOMContentLoaded", function() {
    // Обработчик для кнопки "Добавить инструмент"
    document.querySelector("#toolForm button:nth-of-type(1)").addEventListener("click", function() {
        toolManager.addTool(
            document.getElementById('toolId').value,
            document.getElementById('toolName').value,
            document.getElementById('toolCountry').value,
            document.getElementById('toolPrice').value
        );
    });

    // Обработчик для кнопки "Очистить форму"
    document.querySelector("#toolForm button:nth-of-type(2)").addEventListener("click", function() {
        toolManager.clearForm();
    });

    // Обработчик для кнопки "Показать все инструменты"
    document.querySelector("#toolForm button:nth-of-type(3)").addEventListener("click", function() {
        toolInfoDisplayer.showAllTools();
    });

    // Обработчик для кнопки "Удалить инструмент"
    document.querySelector("#toolForm button:nth-of-type(5)").addEventListener("click", function() {
        const idToDelete = document.getElementById('toolIdToDelete').value;
        toolManager.deleteTool(idToDelete);
        toolInfoDisplayer.showAllTools(); // После удаления инструмента обновляем отображаемую информацию
    });

    // Обработчик для кнопки "Показать инструмент"
    document.querySelector("#toolForm button:nth-of-type(7)").addEventListener("click", function() {
        const idToShow = document.getElementById('toolIdToShow').value;
        toolInfoDisplayer.showTool(idToShow);
    });
});
