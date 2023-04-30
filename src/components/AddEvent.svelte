<script>
    import { Heading, Label, Select, Toggle, Button } from 'flowbite-svelte';

    import DateRangePicker from '../components/DateRangePicker.svelte';
	import DatePicker from '../components/DatePicker.svelte';

	import { datePickerRange } from '../stores/events.js';


    /**
     * @type {boolean}
     */
    let rangeMode;
	datePickerRange.subscribe(r => rangeMode => r)

    let eventTypes = [
		{value:"leave", name: "Leave"},
		{value:"DutyTech1", name: "Primary Duty Tech"},
		{value:"DutyTech2", name: "Secondary Duty Tech"},
		{value:"college", name: "College day"},
	]
    let eventSelected = "leave";

    function toggleRangeMode() {
		rangeMode = !rangeMode;
	}
</script>

<Heading tag="h3">Add event</Heading>
{#if rangeMode}
    <DateRangePicker />
{:else}
    <DatePicker />
{/if}
<Toggle on:click={toggleRangeMode}>
    Range of dates
</Toggle>
<Label for="event-select" class="">
    Event type
    <Select id="event-select" size="lg" items={eventTypes} bind:value={eventSelected} class="mb-6"/>	
</Label>
<div class="flex justify-between">
    <Button >Submit</Button>
    <Button color="alternative">Cancel</Button>
</div>