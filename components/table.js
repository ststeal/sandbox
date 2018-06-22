Vue.component('v-sandbox-table', {
    props: {
        res: [Object],
        type: [String]
    },
    methods: {
        test(){
                fetch('https://sandbox.yandex-team.ru/api/v1.0/task/255392688')
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }

                        throw new Error('Network response was not ok');
                    })
                    .then((json) => {
                        return json;
                    })
                    .catch((error) => {
                        console.log( error);
                    });
        },
        test1(event){
            console.log(event.target.attributes.taskid.value)
        }
    },
    template: '<div class="table">\n' +
    '        <div class="row" v-for="task in res[type].items" :taskId="task.id" @click.stop="test1">\n' +
    '            <div class="cell">\n' +
    '                {{task.id}}\n' +
    '            </div>\n' +
    '            <div class="cell">\n' +
    '                {{task.status}}\n' +
    '            </div>\n' +
    '            <div class="cell">\n' +
    '                {{task.time.updated}}\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>'
});

let content = new Vue({
    el: '.content',
    data: {
        res: {
            conf: {},
            static: {},
            front: {}

        },
        urls: {
            conf: 'https://sandbox.yandex-team.ru/api/v1.0/task?limit=5&offset=0&all_tags=false&all_hints=false&type=BUILD_PORTAL_MORDA_CONF&children=true&forPage=tasks&priority=SERVICE%3AHIGH&found=0',
            static: 'https://sandbox.yandex-team.ru/api/v1.0/task?limit=5&offset=0&all_tags=false&all_hints=false&type=BUILD_YANDEX_WWW_STATIC&children=true&forPage=tasks&priority=SERVICE%3AHIGH&found=0',
            front: 'https://sandbox.yandex-team.ru/api/v1.0/task?limit=5&offset=0&all_tags=false&all_hints=false&type=BUILD_PORTAL_MORDA_FRONT&children=true&forPage=tasks&priority=SERVICE%3AHIGH&found=0'
        },

    },
    computed: {},
    created() {
        for (let url in this.urls) {
            if (this.urls.hasOwnProperty(url)) {
                fetch(this.urls[url])
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }

                        throw new Error('Network response was not ok');
                    })
                    .then((json) => {
                        this.res[url] = json;
                    })
                    .catch((error) => {
                        console.log(url + ': ' + error);
                    });
            }
        }
    }
});