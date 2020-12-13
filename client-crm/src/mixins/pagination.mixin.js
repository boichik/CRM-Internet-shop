import _ from 'lodash'
export default{
    data(){
        return{
            page: +this.$route.query.page || 1,
            pageCount:0,
            allItems:[],
            Items:[]
        }
    },
    methods:{
        paginationHandler(page){
            this.$router.push(`${this.$route.path}?page=${page}`)
            this.Items = this.allItems[page-1] || this.allItems[0]
        }, 
        sPagination(allItems, pageSize){
            this.allItems = _.chunk(allItems, pageSize)
            this.pageCount = _.size(this.allItems)
            this.Items = this.allItems[this.page -1] || this.allItems[0]
        }
    }
}