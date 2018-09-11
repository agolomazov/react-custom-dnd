import React, { Component } from 'react';
import './App.css';

class AppDragDropDemo extends Component {
	state = {
		tasks: [
			{
				name: 'Learn Angular',
				category: 'wip',
				bgcolor: 'yellow',
			},
			{
				name: 'Learn React',
				category: 'wip',
				bgcolor: 'pink',
			},
			{
				name: 'Learn Vue',
				category: 'complete',
				bgcolor: 'skyblue',
			},
		],
	};

	onDragOver = event => {
		event.preventDefault();
	};

	onDragEnter = (event, column) => {
		this.refs[column].classList.add('over');
	};

	onDragLeave = (event, column) => {
		this.refs[column].classList.remove('over');
	};

	onDragStart = (event, id) => {
		console.log('dragstart:', id);
		event.dataTransfer.setData('id', id);
	};

	onDrop = (event, status) => {
		let id = event.dataTransfer.getData('id');
		let tasks = this.state.tasks.filter(task => {
			if (task.name === id) {
				task.category = status;
			}
			return task;
		});

		this.setState({
			...this.state,
			tasks,
		});
		this.refs[status].classList.remove('over');
	};

	render() {
		const tasks = {
			wip: [],
			complete: [],
		};
		this.state.tasks.forEach(t => {
			tasks[t.category].push(
				<div
					key={t.name}
					draggable
					className="draggable"
					style={{ backgroundColor: t.bgcolor }}
					onDragStart={e => this.onDragStart(e, t.name)}
				>
					{t.name}
				</div>
			);
		});
		return (
			<div className="container-drag">
				<h2 className="header">DRAG & DROP DEMO</h2>
				<div
					className="wip"
					onDragOver={e => this.onDragOver(e)}
					onDrop={e => this.onDrop(e, 'wip')}
					ref="wip"
					onDragEnter={e => this.onDragEnter(e, 'wip')}
					onDragLeave={e => this.onDragLeave(e, 'wip')}
				>
					<span className="task-header">WIP</span>
					{tasks.wip}
				</div>
				<div
					className="droppable"
					onDragOver={e => this.onDragOver(e)}
					onDragEnter={e => this.onDragEnter(e, 'complete')}
					onDragLeave={e => this.onDragLeave(e, 'complete')}
					onDrop={e => this.onDrop(e, 'complete')}
					ref="complete"
				>
					<span className="task-header">Complete</span>
					{tasks.complete}
				</div>
			</div>
		);
	}
}

export default AppDragDropDemo;
