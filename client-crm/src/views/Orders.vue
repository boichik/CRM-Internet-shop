<template>
    <div class="app-page-container">
        	<div class="page-title">
				<h2>Заказы</h2>
				<hr>
			</div>
			<section class="app-table">
			   <table class="order-table">
		        <thead>
		          <tr>
		              <th>#ID</th>
		              <th>Номер заказа</th>
		              <th>Дата</th>
		              <th>Сумма</th>
		              <th>Артикул товара</th>
		              <th>Количество</th>
		              <th>Статус</th>
		              <th>Детали</th>
		          </tr>
		        </thead>

		        <tbody>
		          <tr>
		            <td>1</td>
		            <td>133</td>
		            <td>14.11.2020 13:20</td>
		            <td>$300</td>
		            <td>4325526</td>
		            <td>2</td>
		            <td><div class="table-status green">Получен</div></td>
		            <td><a class="waves-effect waves-light btn"><i class="material-icons">more_vert</i></a></td>
		          </tr>
		          <tr>
		            <td>2</td>
		            <td>134</td>
		            <td>14.11.2020 13:20</td>
		            <td>$112</td>
		            <td>2214441</td>
		            <td>1</td>
		            <td><div class="table-status orange">Отправлен</div></td>
		            <td><a class="waves-effect waves-light btn"><i class="material-icons">more_vert</i></a></td>
		          </tr>
		          <tr>
		            <td>3</td>
		            <td>135</td>
		            <td>14.11.2020 13:20</td>
		            <td>$85</td>
		            <td>4223421</td>
		            <td>1</td>
		            <td><div class="table-status yellow">Ожидание</div></td>
		            <td><a class="waves-effect waves-light btn"><i class="material-icons">more_vert</i></a></td>
		          </tr>
		        </tbody>
	           </table>
			</section>
    </div>
</template>