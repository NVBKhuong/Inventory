import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Product from "../../components/Product/Product";
import Carousel from "../../components/Layout/Carousel";
import { SearchBar } from "../../components/Layout/Search";
import FilterAction from "../../components/Layout/FilterAction";

const ProductPage = () => {
    const [text, setText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(16);

    const handleSearch = () => {
        setSearchText(text);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        setSearchText(e.target.value);
    };

    const handleFilterChange = (categoryId: string) => {
        setSelectedCategory(categoryId || null);
    };

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 16);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                    <Carousel />
                    <div className="my-6">
                        <SearchBar
                            text={text}
                            onChange={handleInputChange}
                            onSearch={handleSearch}
                        />
                    </div>
                    <div className="my-6">
                        <FilterAction onFilterChange={handleFilterChange} />
                    </div>
                    <div className="my-6">
                        <Product
                            text={searchText === "" ? null : searchText}
                            selectedCategory={selectedCategory}
                            visibleCount={visibleCount}
                            loadMore={loadMore}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductPage;
