import React from 'react';
import ReactDOM from 'react-dom';

import {
	DataSearch,
	DynamicRangeSlider,
	MultiList,
	ReactiveBase,
	ReactiveList,
	SelectedFilters
} from '@appbaseio/reactivesearch';
import {Col, Collapse, Descriptions, Row} from 'antd';
import 'antd/dist/antd.css';

// import {
// 	ReactiveGoogleMap,
// 	ReactiveOpenStreetMap
// } from '@appbaseio/reactivemaps';
const { Panel } = Collapse;


function getNestedValue(obj, path) {
	const keys = path.split('.');
	const nestedValue = keys.reduce((value, key) => {
		if (value) {
		return value[key];
		}
		return '';
	}, obj);
	if (typeof nestedValue === 'object') {
		return JSON.stringify(nestedValue);
	}
	return nestedValue;
}

function renderItem(res, triggerClickAnalytics) {
	// let birth_place_url = '';
	// let birth_place_id = getNestedValue(res, 'birth_geo_place_id');
	// if (birth_place_id !== '') {
	// 	birth_place_url =
	// 		"https://www.google.com/maps/search/?api=1&query=" +
	// 		getNestedValue(res, 'birth_geo_formatted_address') + "&query_place_id=" +
	// 		getNestedValue(res, 'birth_geo_place_id');
	// }

	let title = getNestedValue(res,"name_full");
	let death_place = getNestedValue(res,"death_place_full");
	// remove array's square brackets for display
	return (
		<Row onClick={triggerClickAnalytics} type="flex" gutter={16} key={res._id} style={{margin:'20px auto',borderBottom:'1px solid #ededed'}}>
			<Col span={24}>
				<Descriptions title={title} column={1} size="small" bordered>
					<Descriptions.Item label="Date of death">{getNestedValue(res, "death_date_display")}</Descriptions.Item>
					<Descriptions.Item label="Place of death">{death_place}</Descriptions.Item>
					<Descriptions.Item label="Date of birth">{getNestedValue(res, "birth_date_display")}</Descriptions.Item>
					<Descriptions.Item label="Place of birth">{getNestedValue(res, "birth_place_full")}</Descriptions.Item>
					<Descriptions.Item label="Place of burial">{getNestedValue(res, "burial_place")}</Descriptions.Item>
					<Descriptions.Item label="Burial plot">{getNestedValue(res, "burial_plot")}</Descriptions.Item>
					<Descriptions.Item label="Gender">{getNestedValue(res, "gender")}</Descriptions.Item>
					<Descriptions.Item label="Obituary newspaper">{getNestedValue(res, "obituary_newspaper")}</Descriptions.Item>
					<Descriptions.Item label="Obituary date">{getNestedValue(res, "obituary_date_display")}</Descriptions.Item>
					<Descriptions.Item label="Obituary transcript">{getNestedValue(res, "obituary_transcribed")}</Descriptions.Item>
				</Descriptions>

				{/*<Collapse ghost={true} defaultActiveKey={[]}>*/}
				{/*	<Panel header="Gravesite info" key="1">*/}
				{/*		<Descriptions column={1} size="small"  bordered>*/}
				{/*			<Descriptions.Item label="Cemetery">Green-Wood Cemetery, Brooklyn, NY, USA</Descriptions.Item>*/}
				{/*			<Descriptions.Item label="Date of burial">{getNestedValue(res, "cemetery_date")}</Descriptions.Item>*/}
				{/*			<Descriptions.Item label="Grave location">{getNestedValue(res, "grave_location")}</Descriptions.Item>*/}
				{/*			<Descriptions.Item label="Grave lot number">{getNestedValue(res, "lot_number")}</Descriptions.Item>*/}
				{/*			<Descriptions.Item label="Cemetery IDr">{getNestedValue(res, "id")}</Descriptions.Item>*/}
				{/*			<Descriptions.Item label="Undertaker">{getNestedValue(res, "undertaker")}</Descriptions.Item>*/}
				{/*		</Descriptions>*/}
				{/*	</Panel>*/}
				{/*</Collapse>*/}
			</Col>
		</Row>
	);
}

// let onPopoverClickPlaceOfDeath = function(item) {
// 	if (typeof item !== 'undefined') {
// 		return <div>{item.death_geo_formatted_address}</div>;
// 	}
// };
// let onPopoverClickPlaceOfResidence = function(item) {
// 	if (typeof item !== 'undefined') {
// 		return <div>{item.residence_geo_formatted_address}</div>;
// 	}
// };
// let onPopoverClickPlaceOfBirth = function(item) {
// 	if (typeof item !== 'undefined') {
// 		return <div>{item.birth_geo_formatted_address}</div>;
// 	}
// };

const CREDENTIALS = process.env.REACT_APP_ES_CREDENTIALS;
const ENDPOINT = process.env.REACT_APP_ES_ENDPOINT;
const INDEX = process.env.REACT_APP_ES_INDEX;
const App = () => (
	<ReactiveBase
		app={INDEX}
		url={ENDPOINT}
		credentials={CREDENTIALS}>

		<Row gutter={16} style={{ padding: 20 }}>
			<Col span={8}>
				<Collapse defaultActiveKey={['2', '1', '4', '6', '7']}>
					{/*<Panel header="Cemetery" key="8">*/}
					{/*	<MultiList*/}
					{/*		componentId="cemetery_facet"*/}
					{/*		dataField="cemetery.keyword"*/}
					{/*		size={100}*/}
					{/*		style={{*/}
					{/*			marginBottom: 20*/}
					{/*		}}*/}
					{/*		filterLabel="Cemetery"*/}
					{/*		showSearch={false}*/}
					{/*		showCheckbox/>*/}
					{/*</Panel>*/}

					<Panel header="Place of death" key="2" forceRender>
						<MultiList
							componentId="place_of_death_country_facet"
							dataField="death_geo_country_long.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="Country"
							filterLabel="Place of death: country"
							showCheckbox/>
						<MultiList
							componentId="place_of_death_state_facet"
							dataField="death_geo_state_long.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="State"
							filterLabel="Place of death: state"
							showCheckbox/>
						<MultiList
							componentId="place_of_death_city_facet"
							dataField="death_geo_city.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="City"
							filterLabel="Place of death: city"
							showCheckbox/>
						{/*<MultiList*/}
						{/*	componentId="place_of_death_neighborhood_facet"*/}
						{/*	dataField="death_geo_neighborhood.keyword"*/}
						{/*	showSearch={false}*/}
						{/*	size={100}*/}
						{/*	style={{*/}
						{/*		marginBottom: 20*/}
						{/*	}}*/}
						{/*	title="Neighborhood"*/}
						{/*	filterLabel="Place of death: neighborhood"*/}
						{/*	showCheckbox/>*/}
						<MultiList
							componentId="place_of_death_hospital_facet"
							dataField="death_location.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="Location"
							filterLabel="Place of death: location"
							showCheckbox/>
						{/*<ReactiveOpenStreetMap*/}
						{/*	componentId="place_of_death"*/}
						{/*	dataField="death_geo_location"*/}
						{/*	title="Place of death"*/}
						{/*	size={1000}*/}
						{/*	autoCenter*/}
						{/*	style={{ height: '300px', width: '100%'}}*/}
						{/*	defaultZoom={2}*/}
						{/*	showSearchAsMove={false}*/}
						{/*	onPopoverClick={onPopoverClickPlaceOfDeath}*/}
						{/*	showMarkers={true}*/}
						{/*	// center={{ lat: 40.691265, lng: -73.9777743 }}*/}
						{/*/>*/}
						{/*<MultiList*/}
						{/*	componentId="place_of_death_facet"*/}
						{/*	dataField="place_of_death.keyword"*/}
						{/*	showSearch={false}*/}
						{/*	size={100}*/}
						{/*	style={{*/}
						{/*		marginBottom: 20*/}
						{/*	}}*/}
						{/*	title="Place of death"*/}
						{/*	filterLabel="Place of death"*/}
						{/*	showCheckbox/>*/}
						{/*<ReactiveGoogleMap*/}
						{/*	componentId="place_of_death"*/}
						{/*	dataField="death_location"*/}
						{/*	title="Place of death"*/}
						{/*	style={{ height: '300px', width: '100%'}}*/}
						{/*	zoom={25}*/}
						{/*	showSearchAsMove={false}*/}
						{/*	searchAsMove={false}*/}
						{/*/>*/}
					</Panel>
					<Panel header="Place of birth" key="4">
						<MultiList
							componentId="place_of_birth_geo_country_facet"
							dataField="birth_geo_country_long.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="Country"
							filterLabel="Place of birth: country (geocode)"
							showCheckbox/>
						<MultiList
							componentId="place_of_birth_geo_state_facet"
							dataField="birth_geo_state_long.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="State"
							filterLabel="Place of birth: state (geocode)"
							showCheckbox/>
						<MultiList
							componentId="place_of_birth_geo_city_facet"
							dataField="birth_geo_city.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="City"
							filterLabel="Place of birth: city (geocode)"
							showCheckbox/>
						{/*<MultiList*/}
						{/*	componentId="place_of_birth_country_facet"*/}
						{/*	dataField="birth_country.keyword"*/}
						{/*	showSearch={false}*/}
						{/*	size={100}*/}
						{/*	style={{*/}
						{/*		marginBottom: 20*/}
						{/*	}}*/}
						{/*	title="Country"*/}
						{/*	filterLabel="Place of birth: country"*/}
						{/*	showCheckbox/>*/}
						{/*<MultiList*/}
						{/*	componentId="place_of_birth_state_facet"*/}
						{/*	dataField="birth_state.keyword"*/}
						{/*	showSearch={false}*/}
						{/*	size={100}*/}
						{/*	style={{*/}
						{/*		marginBottom: 20*/}
						{/*	}}*/}
						{/*	title="State"*/}
						{/*	filterLabel="Place of birth: state"*/}
						{/*	showCheckbox/>*/}
						{/*<MultiList*/}
						{/*	componentId="place_of_birth_city_facet"*/}
						{/*	dataField="birth_city.keyword"*/}
						{/*	showSearch={false}*/}
						{/*	size={100}*/}
						{/*	style={{*/}
						{/*		marginBottom: 20*/}
						{/*	}}*/}
						{/*	title="City"*/}
						{/*	filterLabel="Place of birth: city"*/}
						{/*	showCheckbox/>*/}
						{/*<ReactiveOpenStreetMap*/}
						{/*	componentId="place_of_birth_map"*/}
						{/*	dataField="birth_geo_location"*/}
						{/*	title="Place of birth"*/}
						{/*	size={1000}*/}
						{/*	autoCenter*/}
						{/*	style={{ height: '300px', width: '100%'}}*/}
						{/*	defaultZoom={2}*/}
						{/*	showSearchAsMove={false}*/}
						{/*	onPopoverClick={onPopoverClickPlaceOfBirth}*/}
						{/*	showMarkers={true}*/}
						{/*/>*/}
					</Panel>

					<Panel header="Gender" key="6">
						<MultiList
							componentId="gender_facet"
							dataField="gender.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							filterLabel="Gender"
							URLParams={true}
							showCheckbox/>
					</Panel>
					<Panel header="Year of death" key="7">
						<DynamicRangeSlider
							componentId="death_year_facet"
							dataField="death_date_year"
							rangeLabels={(min, max) => ({
								start: min,
								end: max,
							})}
							stepValue={1}
							showHistogram={true}
							showFilter={true}
							interval={2}
							react={{
								and: ["CategoryFilter", "SearchFilter"]
							}}
							loader="Loading ..."
							filterLabel="Death year range"
							includeNullValues
						/>
					</Panel>
						{/*<DateRange*/}
						{/*	componentId="death_date_facet"*/}
						{/*	title="Range"*/}
						{/*	dataField="death_date"*/}
						{/*	placeholder={{*/}
						{/*		start: 'Start Date',*/}
						{/*		end: 'End Date'*/}
						{/*	}}*/}
						{/*	focused={false}*/}
						{/*	numberOfMonths={1}*/}
						{/*	queryFormat="date"*/}
						{/*	autoFocusEnd={true}*/}
						{/*	showClear={true}*/}
						{/*	showFilter={true}*/}
						{/*	filterLabel="Death Date"*/}
						{/*	URLParams={false}*/}
						{/*	style={{*/}
						{/*		marginBottom: 20*/}
						{/*	}}*/}
						{/*/>*/}

				</Collapse>
			</Col>
			<Col span={16}>
				<DataSearch
					autosuggest={false}
					componentId="search"
					componentType="DATASEARCH"
					dataField={[
						'name_full',
						'name_last',
						'name_last.autosuggest',
						'name_last.english',
						'name_last.search',
						'name_first',
						'name_first.keyword',
						'name_maiden',
						'death_place_full',
						'birth_place_full',
						'burial_place',
						'obituary_newspaper',
						'obituary_transcribed'
					]}
					debounce={0}
					defaultValue={undefined}
					fieldWeights={[
						1,
						1,
						1,
						1,
						1,
						1,
						1,
						1,
						1,
						1,
						1,
						1,
						1
					]}
					fuzziness={0}
					highlight={false}
					placeholder="Search"
					queryFormat="and"
					showFilter={true}
					size={20}
					strictSelection={false}
					style={{
						marginBottom: 20
					}}
					URLParams={true}
				/>

				<SelectedFilters />
				<div id="result">
					<ReactiveList
				  componentId="result"
				  dataField="_score"
				  pagination={true}
				  URLParams
				  react={{
				    and: [
						'death_date_facet',
						'death_year_facet',
						'place_of_death_facet',
						'place_of_death_country_facet',
						'place_of_death_state_facet',
						'place_of_death_city_facet',
						'place_of_death_neighborhood_facet',
						'place_of_death_hospital_facet',
						'place_of_birth_country_facet',
						'place_of_birth_state_facet',
						'place_of_birth_city_facet',
						'search',
						'gender_facet',
						'place_of_birth_geo_country_facet',
						'place_of_birth_geo_state_facet',
						'place_of_birth_geo_city_facet'
				    ]
				  }}
				  renderItem={renderItem}
				  size={25}
				  style={{
				    marginTop: 20
				  }}
				/>
				</div>
			</Col>
			
		</Row>
	</ReactiveBase>
);

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
