import React from 'react';
import Products from './Products';
import { getCategoriesList, getProductsList } from '../ApiCalls/apiCall';

export default function Navbar({ handleLogout }) {
    const [products, setProducts] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [checkedCategories, setCheckedCategories] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');

    React.useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    const getProducts = async () => {
        try {
            const response = await getProductsList();
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCategories = async () => {
        try {
            const response = await getCategoriesList();
            const categoriesWithChecked = response.data?.map(item => ({
                value: item,
                isChecked: false
            }));
            setCategories(categoriesWithChecked);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchChange = (args) => {
        const text = args.target?.value;
        setSearchText(text);
    };

    const handleCategoryClick = (event) => {
        const { value, checked } = event.target;

        const updatedCategories = categories.map(category => {
            if (category.value === value) {
                return { ...category, isChecked: checked };
            }
            return category;
        });
        setCategories(updatedCategories);

        const selectedCategories = updatedCategories.filter(category => category.isChecked).map(category => category.value);
        setCheckedCategories(selectedCategories);
    };

    const filteredProducts = products.filter((product) => {
        const isCategorySelected = checkedCategories?.length === 0 || checkedCategories.includes(product.category);
        const isTitleMatch = searchText ? product.title.toLowerCase().includes(searchText.toLowerCase()) : true;

        return isCategorySelected && isTitleMatch;
    });

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark d-flex">
                <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
                    <span className='logoTextCss'>KeepShopping</span>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                    <div className="ms-1 me-1 dropdown">
                        <div
                            className="rounded-circle dropdown-toggle d-flex align-items-center justify-content-center"
                            style={{ width: "40px", height: "40px", cursor: "pointer" ,background:'#ccb8e6'}}
                            id="profileDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="text-dark fw-bold">U</span>
                        </div>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                            <li>
                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="pt-2">
                <div className="container-fluid">
                    <div className="row flex-nowrap">
                        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                                <div className="fs-5 pb-2 d-none d-sm-inline">CATEGORIES</div>
                                {
                                    categories?.map((category, index) => (
                                        <div className={index !== 0 ? 'pt-1' : ''} key={category.value}>
                                            <input
                                                type="checkbox"
                                                id={`${category.value}_${index}`}
                                                name={category.value}
                                                value={category.value}
                                                checked={category.isChecked}
                                                onClick={handleCategoryClick}
                                            />
                                            <label className="ps-2" htmlFor={`${category.value}_${index}`}>
                                                {category.value.charAt(0).toUpperCase() + category.value.slice(1)}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col py-3">
                            <Products products={filteredProducts} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
