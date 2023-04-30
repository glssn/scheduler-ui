<script lang="ts">
  	import { Button, Modal, Spinner, Label, Select, Toggle } from 'flowbite-svelte';

	import FullCalendar, { Draggable } from 'svelte-fullcalendar';
	import daygridPlugin from '@fullcalendar/daygrid';
	import timegridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction';
    import AddEvent from '../components/AddEvent.svelte';

	// import type { PageData } from '$types';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	export let data: PageData;
	let user = data;
	$: ({user} = data)

	// authenticated
	import { authenticated, authLoadingStore, userData } from '../stores/auth.js'
	import { dateClickedStore, dateRangeStore, datePickerRange } from '../stores/events.js';
    import { onMount } from 'svelte';
	let options = {
		dateClick: handleDateClick,
		droppable: true,
		editable: true,
		events: [
			// initializersial event data
			{ title: 'New Event', start: new Date() },
		],
		initializersialView: 'dayGridMonth',
		plugins: [daygridPlugin, timegridPlugin, interactionPlugin],
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay',
		},
		height: '100%',
		weekends: false,
	};
	let dateModalVisible = false;
  	let calendarRef;
	let eventData = { title: 'Leave', duration: '24:00', color: 'black' };

	function toggleWeekends() {
		options = { ...options, weekends: !options.weekends };
	}

	function gotoPast() {
		let calendarApi = calendarRef.getAPI();
		calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
	}

	function handleDateClick(event) {
		dateModalVisible = !dateModalVisible
		dateClickedStore.set(event.date);
		const { events } = options;
		const calendarEvents = [
			...events,
			{
				title: 'new event',
				start: event.date,
				allDay: event.allDay,
			},
		];
		options = {
			...options,
			events: calendarEvents,
		};
		
	}

    let events = [];

	let dateRange;
	dateRangeStore.subscribe(dr => dateRange = dr);
	
	let eventSelected = "";
    
</script>

{#if $authenticated}
	<div class="demo-app">
		<div class="demo-app-top">
			<Button on:click={toggleWeekends}>
		  Toggle Weekends   
		</Button>
			<Button on:click={gotoPast}>
		  go to a date in the past
		</Button>
		</div>
	
		<div>
			<Button>
				<Draggable {eventData} class="draggable">
					Leave date
				</Draggable>
			</Button>
		</div>
		{#if dateRange[0]}
		<div>
			<p>From : {dateRange[0]}</p>
			<p>From : {dateRange[1]}</p>
		</div>
		{/if}
		<div class="demo-app-calendar">
			<FullCalendar bind:this={calendarRef} {options}/>
		</div>
	</div>
	<Modal bind:open={dateModalVisible} >
		<AddEvent />
	</Modal>
{/if}

<style>
	:global(* > *) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.demo-app {
		width: 100vw;
		height: 100vh;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
	}

	.demo-app-calendar {
		width: 100%;
		flex-grow: 1;
		margin: 0 auto;
		max-width: 1200px;
	}
</style>