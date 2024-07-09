import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Product from "../../components/Product/Product";
import Carousel from "../../components/Layout/Carousel";
import { useState } from "react";
import { SearchBar } from "../../components/Layout/Search";

const Home = () => {
    const [text, setText] = useState("");
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        setSearchText(text);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        setSearchText(e.target.value); // Thực hiện tìm kiếm khi người dùng nhập chữ
    };

    return (
        <div className="grid h-screen" style={{ gridTemplateRows: 'auto 1fr auto' }}>
            <div className="row-start-1 row-end-2">
                <Header />
            </div>
            <div className="row-start-2 row-end-3 grid" style={{ gridTemplateRows: 'auto 1fr' }}>
                <div className="row-start-1 row-end-2">
                    <Carousel />
                </div>
                <div className="row-start-2 row-end-3">
                    <SearchBar
                        text={text}
                        onChange={handleInputChange}
                        onSearch={handleSearch}
                    />
                </div>
                <div className="row-start-3 row-end-4 my-20 mx-5">
                    <Product
                        text={searchText === "" ? null : searchText}
                    />
                </div>
            </div>
            <div className="row-start-4 row-end-5">
                <Footer />
            </div>
        </div>
    );
};

export default Home;
