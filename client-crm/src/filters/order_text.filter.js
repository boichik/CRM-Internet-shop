export default function orderFilter(value, type){
    if(type=='color'){
        
       return (value =='placed_order') ? 'orange' : 
					  (value =='order_processed') ? 'orange' : 
					  (value=='submitted') ? 'yellow' :
					  (value=='delivery') ? 'yellow' :
					  (value=='received') ? 'green' :
					  (value=='refund') ? 'blue' :
					  'red'
    }
    if(type=='text'){
     return   (value =='placed_order') ? 'Оформлен заказ' :
                      (value =='order_processed') ? 'Обработан заказ': 
                      (value =='submitted') ? 'Отправлен':
                      (value =='delivery') ? 'Доставка':
                      (value =='received') ? 'Получен':
                      (value =='refund') ? 'Возврат':
                                        'Отменён'
    }
}