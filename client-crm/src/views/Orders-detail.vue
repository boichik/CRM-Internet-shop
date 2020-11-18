<template>
    <div class="app-page-container">
        	<div class="page-title">
				<h2>Заказы > 133</h2>
				<hr>
			</div>
			<section class="app-table">
				<div class="detail-container">
					<div class="detail-block green">
	                  <p>Дата : 14.11.2020 13:20</p>
	                  <p>Cумма : 133$</p>
	                  <p>Артикул товара : 434345</p>
	                  <p>Количество : 2</p>
	                  <p>ФИО : Олександр Кущ</p>
	                  <p>Телефон : +38099999000</p>
	                  <p>Адресс : м. Киев, ул. Кущ 13</p>
	                  <p>Доставка : НП</p>
	                  <p>Коментарий : -</p>
					</div>
					<form class="detail-form">
	                	  <div class="input-field col s12">
						    <select>
						      <option value="" disabled selected>Статус</option>
						      <option value="1">Оформлен заказ</option>
						      <option value="2">Обработан заказ</option>
						      <option value="3">Отправлен</option>
						      <option value="4">Доставка</option>
						      <option value="5">Получен</option>
						      <option value="6">Возврат</option>		           
						      <option value="7">Отменён</option>		           
						    </select>
						    <label>Статус Заказа</label>
						  </div>
                          <div class="input-field  detail-input">
					          <input id="last_name" type="text" class="validate">
					          <label for="last_name">Коментарий</label>
					      </div>
					      <button class="waves-effect waves-light btn">Обновить<i class="material-icons right">refresh</i></button>
	                </form>
					<table class="detail-table">
						<thead>
							<tr>
								<th>Дата</th>
								<th>Статус</th>
								<th>Коментарий</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>14.11.2020 13:20</th>
								<th>Оформлен заказ</th>
								<th>-</th>
							</tr>
							<tr>
								<th>14.11.2020 14:00</th>
								<th>Обработан заказ</th>
								<th>-</th>
							</tr>
							<tr>
								<th>14.11.2020 17:10</th>
								<th>Отправлен</th>
								<th>5800 9999 2311 233451</th>

							</tr>
							<tr>
								<th>15.11.2020 9:00</th>
								<th>Доставка</th>
								<th>-</th>

							</tr>
							<tr>
								<th>15.11.2020 18:00</th>
								<th>Получен</th>
								<th>-</th>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
    </div>
</template>