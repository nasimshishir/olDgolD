import React from 'react';

const Blog = () => {
    return (
        <div>
            <div className='bg-slate-50'>

                <h1 className="mb-5 text-5xl font-bold text-black text-center pt-16">Blogs</h1>
                {/* Blog Display */}
                <div className='container mx-auto grid gap-5 grid-cols-1 md:grid-cols-2 py-20'>
                    <div className="card w-full glass bg-white shadow-lg">
                        <figure><img src="https://i.postimg.cc/YCXpXMpn/pexels-sergei-starostin-6466141.jpg" alt="some boring text" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">What are the different ways to manage a state in a React application?</h2>
                            <p>React state management is a process for managing the data that React components need in order to render themselves. This data is typically stored in the component's state object. When the state object changes, the component will re-render itself. React state management is basically half of a React app.
                            </p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Learn More!</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-full glass bg-white shadow-lg">
                        <figure><img src="https://i.postimg.cc/8zxYk0wk/pexels-realtoughcandycom-11035363.jpg" alt="some boring text!" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">How does prototypical inheritance work?</h2>
                            <p>When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype.
                            </p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Learn More!</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-full glass bg-white shadow-lg">
                        <figure><img src="https://i.postimg.cc/TPP9nqwL/pexels-realtoughcandycom-11035380.jpg" alt="some boring text!" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">What is a unit test? Why should we write unit tests?</h2>
                            <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                            </p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Learn More!</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-full glass bg-white shadow-lg">
                        <figure><img src="https://i.postimg.cc/v8Wx0gC0/72d4-article-210902-node-js-body-text.png" alt="some boring text!" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">React vs. Angular vs. Vue</h2>
                            <p>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Learn More!</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Blog;