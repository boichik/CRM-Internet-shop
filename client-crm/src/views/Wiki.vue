<template>
    <div class="app-page-container">
        <div class="page-title">
            <h2><router-link to="/api">Назад</router-link>>Wiki</h2>
            <hr>
        </div>
        <section class="app-table">
            <div class="wiki">
                  <ul class="collapsible" ref="collapsible">
                    <li>
                    <div class="collapsible-header"><span class="wiki-badge blue">GET</span><p>/api/getOrders</p></div>
                        <div class="collapsible-body"><span>Запрос для получения всех заказов. Возврат данных осуществляется в формате JSON ввиде массива.</span>
                         <pre class='code code-javascript'>
                                <div class="pre-label-container">
                                    <p>JSON</p>
                                </div>
                                <code>"orders": [{
                                        "_id": "order_id",
                                        "order_id": 1,
                                        "user_id": "user_id",
                                        "costumer_id": "1",
                                        "order_date": "2020-07-02T14:44:58.293Z",
                                        "costs": 231,
                                        "article_good": "1000",
                                        "count": 1,
                                        "status": [{
                                            "_id": "status_id",
                                            "status_now": "placed_order",
                                            "changes_date": "05.12.2020, 15:13:37",
                                            "comnt": "-"
                                        }, {
                                            "_id": "status_id",
                                            "status_now": "delivery",
                                            "changes_date": "05.12.2020, 15:49:37",
                                            "comnt": ""
                                        }],
                                        "delivery": "NP",
                                        "comment": "-",
                                        "__v": 0
                                    }
                                    ...
                                </code>
                            </pre>
                            <span>Для ознакомления c отправкой запросов перейдите на <router-link to="/apiexample">страницу с примерами</router-link></span>
                        </div>
                    </li>
                    <li>
                    <div class="collapsible-header"><span class="wiki-badge blue">GET</span><p>/api/getCostumers</p></div>
                        <div class="collapsible-body"><span>Запрос для получения всех клиентов. Возврат данных осуществляется в формате JSON ввиде массива.</span>
                            <pre class='code code-javascript'>
                                <div class="pre-label-container">
                                    <p>JSON</p>
                                </div>
                                <code>"costumers": [{
                                        "_id": "costumer_id",
                                        "user_id": "user_id",
                                        "costumer_id": "1",
                                        "bio": "Ivan Ivanov Ivanovich",
                                        "phone": "38011111111",
                                        "email": "test@test.ru",
                                        "orders": [{
                                            "_id": "c_orders_id",
                                            "order_id": "order_id",
                                            "address": "Kyiv, Shevchenka 88",
                                            "order_bio": "Vitali Orl Olegovich"
                                        }, {
                                            "_id": "c_orders_id",
                                            "order_id": "order_id",
                                            "address": "Kyiv, Shevchenka 90",
                                            "order_bio": "Ulia Shap Yirivna"
                                        }],
                                        "__v": 0
                                    },
                                    ...
                                </code>
                            </pre>
                            <span>Для ознакомления c отправкой запросов перейдите на <router-link to="/apiexample">страницу с примерами</router-link></span>
                        </div>
                    </li>
                    <li>
                    <div class="collapsible-header"><span class="wiki-badge blue">GET</span><p>/api/getGoods</p></div>
                        <div class="collapsible-body">><span>Запрос для получения всех товаров. Возврат данных осуществляется в формате JSON ввиде массива.</span>
                            <pre class='code code-javascript'>
                                <div class="pre-label-container">
                                    <p>JSON</p>
                                </div>
                                <code>{
                                        "goods":[{
                                            "_id": "good_id",
                                            "good_id": "good_id",
                                            "user_id": "user_id",
                                            "article": "12",
                                            "count": 10,
                                            "manufacturer": "test",
                                            "name": "stest",
                                            "price": 100,
                                            "__v": 0
                                        },
                                </code>
                            </pre>
                            <span>Для ознакомления c отправкой запросов перейдите на <router-link to="/apiexample">страницу с примерами</router-link></span>
                        </div>
                    </li>
                    <li>
                    <li>
                    <div class="collapsible-header"><span class="wiki-badge blue">GET</span><p>/api/getReports</p></div>
                        <div class="collapsible-body"><span>Запрос для получения всех отчетов. Возврат данных осуществляется в формате JSON ввиде массива.</span>
                            <div class="warning-text"><i class="material-icons">warning</i><p>Данная информация не будет геннерироваться в случае, если не будут выполнены условия! Условия указаны во всех запросах на добавление товаров, заказов...</p></div>
                            <pre class='code code-javascript'>
                                    <div class="pre-label-container">
                                        <p>JSON</p>
                                    </div>
                                    <code>{
                                            "reports":[{
                                                "_id": "report_id",
                                                "user_id": "user_id",
                                                "report_date": "2020-07-31T14:44:58.293+00:00",
                                                "income": 1677,
                                                "possible": 432,
                                                "allOrders":[{
                                                    "_id" : "allOrders_id",
                                                    "order_id": "order_id",
                                                    "order_date" : "2020-07-07T14:44:58.293Z"
                                                }],
                                                "price": 100,
                                                "__v": 0
                                            },
                                    </code>
                                </pre>
                                <span>Для ознакомления c отправкой запросов перейдите на <router-link to="/apiexample">страницу с примерами</router-link></span>
                        </div>
                    </li>
                    <li>
                    <div class="collapsible-header"><span class="wiki-badge green">POST</span><p>/api/addGood</p></div>
                        <div class="collapsible-body"><span>Запрос для отправки нового товара. Отправка данных осуществляется через Body, в формате JSON. Если товар уже существует, он не будет обновлен, а добавиться как новый </span>
                            <div class="warning-text"><i class="material-icons">warning</i><p>Товары необходимы для получения в дальнейшем статистики на графике. Для более точной информации на графике заказы которые
                            будут приходить в систему, должны иметь существующий артикул товара, что есть уже в системе!</p></div>
                            <pre class='code code-javascript'>
                                <div class="pre-label-container">
                                    <p>JSON</p>
                                </div>
                                <code>{
                                        "good": {
                                            "article": "12",
                                            "count": 10,
                                            "manufacturer": "test",
                                            "name": "stest",
                                            "price": 100
                                        },
                                        "API_KEY": "your_api_key"
                                        }
                                </code>
                            </pre>
                            <span>Для ознакомления c отправкой запросов перейдите на <router-link to="/apiexample">страницу с примерами</router-link></span>
                        </div>
                    </li>
                    <li>
                    <div class="collapsible-header"><span class="wiki-badge green">POST</span><p>/api/addOrder</p></div>
                        <div class="collapsible-body"><span>Запрос для отправки нового заказа. Отправка данных осуществляется через Body, в формате JSON. При создании заказа проверяется все клиенты на совпадение
                            по номеру телефона, если такой был найден в его историю добавиться текущий заказ. Если клиента не было найдено по текущему номеру телефона - он будет создан</span>
                            <div class="warning-text"><i class="material-icons">warning</i><p>Если вы хотите в дальнейшем получать статистику на графике. Необходимо добавить товары, на которые будут приходить заказы!</p></div><br>
                            <div class="warning-text"><i class="material-icons">warning</i><p>Поле "order_date" обязательно должно быть в формате "ISODate"!</p></div>
                            <pre class='code code-javascript'>
                                <div class="pre-label-container">
                                    <p>JSON</p>
                                </div>
                                <code>{
                                        "order": {
                                            "order_date": "2020-07-31T14:44:58.293+00:00",
                                            "costs": "12",
                                            "article_good": "1002",
                                            "count": "1",
                                            "delivery": "Delivery OM",
                                            "comment": "my comment",
                                            "bio": "Ivan Ivanov Ivanovich",
                                            "phone": "38034535467",
                                            "email": "v431wer1@gmail.com",
                                            "address": "Chercasi, Grushevskogo 23"
                                        },
                                        "API_KEY": "your_api_key"
                                        }
                                </code>
                            </pre>
                            <span>Для ознакомления c отправкой запросов перейдите на <router-link to="/apiexample">страницу с примерами</router-link></span>
                        </div>
                    </li>
                    <li>
                    <div class="collapsible-header"><span class="wiki-badge green">POST</span><p>/api/addCostumer</p></div>
                        <div class="collapsible-body"><span>Запрос для отправки создания нового клиента. Отправка данных осуществляется через Body, в формате JSON. Если клиент уже существует, он будет обновлен</span>
                            <pre class='code code-javascript'>
                                <div class="pre-label-container">
                                    <p>JSON</p>
                                </div>
                                <code>{
                                        "costumer": {
                                            "bio": "Ivan Ivanov Ivanovich",
                                            "phone": "38011111111",
                                            "email": "test@test.ru"
                                        },
                                        "API_KEY": "your_api_key"
                                        }
                                </code>
                            </pre>
                            <span>Для ознакомления c отправкой запросов перейдите на <router-link to="/apiexample">страницу с примерами</router-link></span>
                        </div>
                    </li>
                    <li>
                    <div class="collapsible-header"><span class="wiki-badge green">POST</span><p>/api/updateCostumer</p></div>
                        <div class="collapsible-body"><span></span> <div class="warning-text"><i class="material-icons">warning</i>
                        <p>Функция пока не доступна!</p></div></div>
                    </li>
                    <li>
                    <div class="collapsible-header"><span class="wiki-badge green">POST</span><p>/api/updateGoods</p></div>
                        <div class="collapsible-body"><span></span><div class="warning-text"><i class="material-icons">warning</i>
                        <p>Функция пока не доступна!</p></div></div>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name:'wiki',
    data:()=>({
      collapsible : null,
      host:'localhost:5000'
    }),
    async mounted(){
     this.collapsible = M.Collapsible.init(this.$refs.collapsible)

    }
}
</script>