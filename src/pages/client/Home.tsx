import Header from "../../components/Layout/Header"
import Footer from "../../components/Layout/Footer"
import Product from "../../components/Product/Product"
import Carousel from "../../components/Layout/Carousel"

const Home = () => {

    return (
        <div className="grid h-screen" style={{ gridTemplateRows: 'auto 1fr auto' }}>
            <div className="row-start-1 row-end-2">
                <Header />
            </div>
            <div className="row-start-2 row-end-3 grid" style={{ gridTemplateRows: 'auto 1fr' }}>
                <div className="row-start-1 row-end-2">
                    <Carousel />
                </div>
                <div className="row-start-2 row-end-3 my-20 mx-5">
                    <Product />
                </div>
            </div>
            <div className="row-start-3 row-end-4">
                <Footer />
            </div>
        </div>
    )
}

export default Home
