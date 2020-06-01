import { AsyncStorage } from "react-native";
import { generateUID } from "./helper";

const FLASHCARDS_STORAGE_KEY = "flashcards_data";

function initialData() {
	return {
		"632mgp7hm68vzvg2amz1hq": {
			id: "632mgp7hm68vzvg2amz1hq",
			title: "React",
			questions: [
				{
					question: "What is React Native ?",
					answer:
						"React Native is a JavaScript framework for writing real, natively rendering mobile applications for iOS and Android. It’s based on React, Facebook’s JavaScript library for building user interfaces.",
				},
				{
					question: "What is the role of SectionList ?",
					answer:
						"It renders on-screen items, but with headers.",
				},
				{
					question: "What is virtual DOM?",
					answer:
						"The virtual DOM (VDOM) is an in-memory representation of Real DOM.",
				},
				
			],
		},
		"724mgp7hm68vzvg2amz1hq": {
			id: "724mgp7hm68vzvg2amz1hq",
			title: "Javascript",
			questions: [
				{
					question: "What is JavaScript?",
					answer: "JavaScript is a client-side as well as server side scripting language that can be inserted into HTML pages and is understood by web browsers",
				},
				{
					question: "What is the use of isNaN function?",
					answer: "isNan function returns true if the argument is not a number otherwise it is false.",
				},
				{
					question: "What is a prompt box?",
					answer: "A prompt box is a box which allows the user to enter input by providing a text box. Label and box will be provided to enter the text or number.",
				},
				{
					question: "What is === operator?",
					answer: "=== is called as strict equality operator which returns true when the two operands are having the same value without any type conversion",
				},
			],
		},
		"636jgrwdbhf58lxznh9q79": {
			id: "636jgrwdbhf58lxznh9q79",
			title: "CSS",
			questions: [
				{
					question: "What is CSS?",
					answer: "It describes how the HTML content will be shown on screen.",
				},
				{
					question: "What are gradients in CSS?",
					answer:
						"It is a property of CSS which allows you to display a smooth transformation between two or more than two specified colors.",
				},
				{
					question: "What is a CSS pseudo-class?",
					answer:
						"It is a class that is used to define a special state of an HTML element.",
				},
				
			],
		},
		sxbjgrwdbhf58lxznh9q79: {
			id: "sxbjgrwdbhf58lxznh9q79",
			title: "Redux",
			questions: [
				{
					question: "What is store in redux?",
					answer: "The store holds the application state and supplies the helper methods for accessing the state.There is only one Store while using Redux",
				},
				{
					question: "What is a reducer",
					answer: "It is a function that takes input and returns and object with a type and data property.",
				},
				{
					question: "What is the typical flow of data in a React + Redux app",
					answer: "Call-back from UI component dispatches an action with a payload, these dispatched actions are intercepted and received by the reducers. this interception will generate a new application state.",
				},
			],
		},
	};
}

export async function getDecks() {
	try {
		const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
		if (results) {
			const data = JSON.parse(results);
			return data;
		} else {
			await AsyncStorage.setItem(
				FLASHCARDS_STORAGE_KEY,
				JSON.stringify(initialData())
			);
			return initialData();
		}
	} catch (error) {
		await AsyncStorage.setItem(
			FLASHCARDS_STORAGE_KEY,
			JSON.stringify(initialData())
		);
		return initialData();
	}
}

export async function saveDeckTitle(title) {
	const id = generateUID();
	const deck = {
		id: id,
		title: title,
		questions: [],
	};

	await AsyncStorage.mergeItem(
		FLASHCARDS_STORAGE_KEY,
		JSON.stringify({
			[id]: deck,
		})
	);
	return deck;
}

export async function saveCardToDeck(deckId, card) {
	const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
	if (results) {
		const data = JSON.parse(results);
		const deck = data[deckId];
		deck.questions = deck.questions.concat([card]);
		await AsyncStorage.mergeItem(
			FLASHCARDS_STORAGE_KEY,
			JSON.stringify({
				[deckId]: deck,
			})
		);
		return card;
	}
}

export async function removeDeck(deckId) {
	const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
	if (results) {
		const data = JSON.parse(results);
		delete data[deckId];

		await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
		return data;
	}
	return {};
}
