
<template>
    <div class="app-page-container">
        <div class="page-title">
            <h2><router-link to="/api">Назад</router-link>>Примеры</h2>
            <hr>
        </div>
        <section class="app-table">
            <div class="api-container">
                <div class="row">
                    <div class="col s12">
                        <ul class="tabs" ref="tabs">
                            <li class="tab col s3"><a class="active" href="#javascript">Javascript</a></li>
                            <li class="tab col s3"><a href="#php">PHP</a></li>
                            <li class="tab col s3"><a href="#python">Python</a></li>
                            <li class="tab col s3"><a href="#c">C#/.NET</a></li>
                        </ul>
                    </div>
                    <div id="javascript" class="col s12">
                        <pre class='code code-javascript'>
                            <div class="pre-label-container">
                                <p>GET</p>
                            </div>
                            <code>var url = "http://{{this.host}}/api/getOrders";

                                    var xhr = new XMLHttpRequest();
                                    xhr.open("GET", url);

                                    xhr.setRequestHeader("api", "{{this.userInfo}}");

                                    xhr.onreadystatechange = function () {
                                    if (xhr.readyState === 4) {
                                        console.log(xhr.status);
                                        console.log(xhr.responseText);
                                    }};

                                    xhr.send();
                            </code>
                        </pre>
                        <pre class='code code-javascript'>
                            <div class="pre-label-container">
                                <p>POST</p>
                            </div>
                            <code>var url = "http://localhost:5000/api/addOrder";

                                var xhr = new XMLHttpRequest();
                                xhr.open("POST", url);

                                xhr.setRequestHeader("Content-Type", "application/json");

                                xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4) {
                                    console.log(xhr.status);
                                    console.log(xhr.responseText);
                                }};

                                var data = `{
                                "order": {
                                    "order_date": "2020-07-31T17:44:58.293+00:00",
                                    "costs": "124",
                                    "article_good": "1002",
                                    "count": "2",
                                    "delivery": "Delivery OM",
                                    "comment": "my comment",
                                    "bio": "Ivan Ivanov Ivanovich",
                                    "phone": "38034535467",
                                    "email": "v431wer1@gmail.com",
                                    "address": "Chercasi, Grushevskogo 23"
                                },
                                "API_KEY": "22f05fc131e774296ed95f1078baa00a80e833d6"
                                }`;

                                xhr.send(data);
                            </code>
                        </pre>
                    </div>
                    <div id="php" class="col s12">
                        <pre class='code code-javascript'>
                            <div class="pre-label-container">
                                <p>GET</p>
                            </div>
                            <code>$url = "http://{{this.host}}/api/getOrders";

                                    $curl = curl_init($url);
                                    curl_setopt($curl, CURLOPT_URL, $url);
                                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                                    $headers = array(
                                    "api: {{this.userInfo}}",
                                    );
                                    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
                                    //for debug only!
                                    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
                                    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

                                    $resp = curl_exec($curl);
                                    curl_close($curl);
                                    var_dump($resp);
                            </code>
                        </pre>
                        <p>В POST-запросе вместо "{1_" нужно подставить <i class="material-icons">chevron_left</i><i class="material-icons">chevron_left</i><i class="material-icons">chevron_left</i>Data
                        </p>
                    
                        <pre class='code code-javascript'>
                            <div class="pre-label-container">
                                <p>POST</p>
                            </div>
                            <code>$url = "http://localhost:5000/api/addOrder";

                                    $curl = curl_init($url);
                                    curl_setopt($curl, CURLOPT_URL, $url);
                                    curl_setopt($curl, CURLOPT_POST, true);
                                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                                    $headers = array(
                                    "Content-Type: application/json",
                                    );
                                    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

                                    $data = {1_
                                        {
                                        "order": {
                                        "order_date": "2020-07-31T17:44:58.293+00:00",
                                        "costs": "124",
                                        "article_good": "1002",
                                        "count": "2",
                                        "delivery": "Delivery OM",
                                        "comment": "my comment",
                                        "bio": "Ivan Ivanov Ivanovich",
                                        "phone": "38034535467",
                                        "email": "v431wer1@gmail.com",
                                        "address": "Chercasi, Grushevskogo 23"
                                        },
                                        "API_KEY": "22f05fc131e774296ed95f1078baa00a80e833d6"
                                        }
                                    DATA;

                                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

                                    //for debug only!
                                    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
                                    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

                                    $resp = curl_exec($curl);
                                    curl_close($curl);
                                    var_dump($resp);                             
                            </code>
                        </pre>
                    </div>
                    <div id="python" class="col s12">
                        <pre class='code code-javascript'>
                            <div class="pre-label-container">
                                <p>GET</p>
                            </div>
                            <code>import requests
                                    from requests.structures import CaseInsensitiveDict

                                    url = "http://{{this.host}}/api/getOrders"

                                    headers = CaseInsensitiveDict()
                                    headers["api"] = "{{this.userInfo}}"


                                    resp = requests.get(url, headers=headers)

                                    print(resp.status_code)
                            </code>
                        </pre>
                        <pre class='code code-javascript'>
                            <div class="pre-label-container">
                                <p>POST</p>
                            </div>
                            <code>import requests
                                from requests.structures import CaseInsensitiveDict

                                url = "http://localhost:5000/api/addOrder"

                                headers = CaseInsensitiveDict()
                                headers["Content-Type"] = "application/json"

                                data = """
                                {
                                "order": {
                                    "order_date": "2020-07-31T17:44:58.293+00:00",
                                    "costs": "124",
                                    "article_good": "1002",
                                    "count": "2",
                                    "delivery": "Delivery OM",
                                    "comment": "my comment",
                                    "bio": "Ivan Ivanov Ivanovich",
                                    "phone": "38034535467",
                                    "email": "v431wer1@gmail.com",
                                    "address": "Chercasi, Grushevskogo 23"
                                },
                                "API_KEY": "22f05fc131e774296ed95f1078baa00a80e833d6"
                                }
                                """


                                resp = requests.post(url, headers=headers, data=data)

                                print(resp.status_code)
                            </code>
                        </pre>
                    </div>
                    <div id="c" class="col s12">
                            <pre class='code code-javascript'>
                            <div class="pre-label-container">
                                <p>GET</p>
                            </div>
                            <code>var url = "http://{{this.host}}/api/getOrders";

                                    var httpRequest = (HttpWebRequest)WebRequest.Create(url);

                                    httpRequest.Headers["api"] = "{{this.userInfo}}";


                                    var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                                    {
                                    var result = streamReader.ReadToEnd();
                                    }

                                    Console.WriteLine(httpResponse.StatusCode);
                            </code>
                        </pre>
                        <pre class='code code-javascript'>
                            <div class="pre-label-container">
                                <p>POST</p>
                            </div>
                            <code>var url = "http://localhost:5000/api/addOrder";

                                var httpRequest = (HttpWebRequest)WebRequest.Create(url);
                                httpRequest.Method = "POST";

                                httpRequest.ContentType = "application/json";

                                var data = @"{
                                ""order"": {
                                    ""order_date"": ""2020-07-31T17:44:58.293+00:00"",
                                    ""costs"": ""124"",
                                    ""article_good"": ""1002"",
                                    ""count"": ""2"",
                                    ""delivery"": ""Delivery OM"",
                                    ""comment"": ""my comment"",
                                    ""bio"": ""Ivan Ivanov Ivanovich"",
                                    ""phone"": ""38034535467"",
                                    ""email"": ""v431wer1@gmail.com"",
                                    ""address"": ""Chercasi, Grushevskogo 23""
                                },
                                ""API_KEY"": ""22f05fc131e774296ed95f1078baa00a80e833d6""
                                }";

                                using (var streamWriter = new StreamWriter(httpRequest.GetRequestStream()))
                                {
                                streamWriter.Write(data);
                                }

                                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                                {
                                var result = streamReader.ReadToEnd();
                                }

                                Console.WriteLine(httpResponse.StatusCode);
                            </code>
                        </pre>
                    </div>
                </div>
            </div>        
        </section>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name:'apiexample',
    data:()=>({
        tabs:null,
        userInfo:[],
        host:'localhost:5000'
    }),
    async mounted(){
        this.tabs = M.Tabs.init(this.$refs.tabs)
        this.userInfo = await this.$store.getters.info.api_key
    }
}
</script>