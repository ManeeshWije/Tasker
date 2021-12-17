function App() {
	return (
		<div className="App">
			<h1>Welcome</h1>
			<h4>Your Current Tasks</h4>
			<div className="todos">
				<div className="todo">
					<div className="checkbox"></div>
					<div className="text">Get the Bread</div>
					<div className="delete">x</div>
				</div>
				<div className="todo-complete">
					<div className="checkbox"></div>
					<div className="text">Get the Milk</div>
					<div className="delete">x</div>
				</div>
			</div>
		</div>
	);
}

export default App;
