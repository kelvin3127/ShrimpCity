import React from 'react'
import Footer from '../Widgets/Footer/Footer';
import Header from '../Widgets/Header/Header';

 const MainLayout = (props) => {
    return (
        <div>
            <Header {...props}/>
            <div className="container">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;