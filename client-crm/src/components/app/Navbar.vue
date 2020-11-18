<template>
    <nav class="alpha nav">
	    <div class="nav-wrapper navbar">
	      <a class="left" href="#!" @click.prevent="$emit('click')"><i class="large material-icons right">dehaze</i></a>
	      <a href="#" class="brand-logo logo">Logo</a>
	      <ul id="nav-mobile" class="right ">
           <li class="drop-link"><a class="dropdown-trigger" href="#!" data-target="dropdown1">Vlad Vlad
           	<i class="large material-icons right">arrow_drop_down</i></a></li>
	      </ul>
	    </div>
    </nav>
</template>