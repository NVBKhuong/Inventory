import { XMarkIcon } from '@heroicons/react/16/solid';
import { IProduct } from '../../models/Produdct';
import { useEffect, useState } from 'react';
import { Autocomplete,  TextField,  Stack } from "@mui/material";
import instance from '../../service/api/customAxios';
import { useAppDispatch } from '../../service/store/store';
import { getAllProducts } from '../../service/features/productSlice';
import { toast } from 'react-toastify';

type PopupProductDetailProps = {
    product: IProduct;
    onPopupDetail: boolean;
    setOnPopupDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupProductDetail: React.FC<PopupProductDetailProps> = ({
    product,
    onPopupDetail,
    setOnPopupDetail,
}) => {
    const [imageSend, setImageSend] = useState<File | null>(null);
    const dispatch = useAppDispatch();
    const [form, setForm] = useState(product)
    const [checkValid, setCheckValid] = useState({
        name: false,
        origin: false,
        thumbnail: false, description: false,
    })
    const validation = () => {
        setCheckValid(prev => ({
            ...prev, name: form.name.trim() === '',
            origin: form.origin.trim() === '',
            thumbnail: form.thumbnailUrl === null,
            description: form.description === '' || form.description === null,
        }))
        return form.name.trim() === '' || form.origin.trim() === '' || form.thumbnailUrl === null || form.description === '' || form.description === null
    }

    useEffect(() => {
        setForm(product)
    }, [product])
    const handleUpdate = async () => {
        if (validation()) return;
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('description', form.description)
        formData.append('origin', form.origin)
        imageSend && formData.append('thumbnail', imageSend)
        formData.append('brand', form.brand)
        formData.append('price', form.price.toString())
        formData.append('promotionPrice', form.promotionPrice.toString())
        formData.append('status', form.status)
        await instance.put(`/products/${product.id}`, formData)
            .then(() => {
                dispatch(getAllProducts({ text: '' })).then(() => {
                    setCheckValid({
                        name: false,
                        origin: false,
                        thumbnail: false, description: false,
                    })
                    toast.success('Update successfully')
                    setOnPopupDetail(false)
                })
            })
            .catch(err => { console.log(err); toast.error('Update failed'); })
    }
    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto ${onPopupDetail ? '' : 'hidden'
                }`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="bg-white-700 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pb-2">
                                <div className="flex">
                                    <h3
                                        className="text-lg leading-6 w-full font-medium text-gray-900"
                                        id="modal-title"
                                    >
                                        Product Detail
                                    </h3>
                                    <XMarkIcon
                                        width={16}
                                        height={16}
                                        className="h-6 w-6 ml-auto cursor-pointer"
                                        onClick={() => {
                                            setCheckValid({
                                                name: false,
                                                origin: false,
                                                thumbnail: false, description: false,
                                            }); setOnPopupDetail(false)
                                        }}
                                    />
                                    <hr className="mt-2 text-black-700" />
                                </div>
                                <div className="mt-4 border-t grid grid-cols-2 gap-4 p-8 overflow-y-scroll h-96 w-auto">
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Name
                                        </span>
                                        <span className="text-red-600 text-xl">*</span>
                                    </div>
                                    <div>
                                        <input
                                            value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                            type="text" id="name"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                        />
                                        {checkValid.name && <p className='text-red-500 text-xs mt-2'>This field is required!</p>}
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Description
                                        </span>
                                        <span className="text-red-600 text-xl">*</span>
                                    </div>
                                    <div>
                                        <input
                                            value={form.description} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                            type="text" id="description"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                        />
                                        {checkValid.description && <p className='text-red-500 text-xs mt-2'>This field is required!</p>}
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Origin
                                        </span>
                                        <span className="text-red-600 text-xl">*</span>
                                    </div>
                                    <div>
                                    <div>
                                        <Autocomplete options={['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Congo-Brazzaville)','Costa Rica','Croatia','Cuba','Cyprus','Czechia (Czech Republic)','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini (fmr. "Swaziland")','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar (formerly Burma)','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine State','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States of America','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
]} value={form.origin}
                                            disablePortal disableClearable size='small'
                                            onChange={(_, value) => setForm(prev => ({ ...prev, origin: value }))}
                                            renderInput={(params) => <TextField {...params} />} />
                                    </div>
                                        <input
                                            value={form.origin} onChange={(e) => setForm(prev => ({ ...prev, origin: e.target.value }))}
                                            type="text" id="origin"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                        />
                                        {checkValid.origin && <p className='text-red-500 text-xs mt-2'>This field is required!</p>}
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Brand
                                        </span>
                                    </div>
                                    <div>
                                        <Autocomplete options={['Vinamilk', 'TH True Milk', 'Dutch Lady', 'Meadow Fresh', 'Nutifood', 'Nestle', 'Dalat Milk', 'Morinaga', 'Anlene', 'Abbott', 'Friso', 'Aptamil', 'Glico', 'Wyeth', 'Hipp', 'Mead Johnson', 'Bellamy’s', 'Kendamil', 'Biomil', 'Namyang', 'Ovaltine', 'Vinasoy', 'Yakult', 'Coca-Cola', 'Enfa', 'Pediasure', 'Similac', 'S26', 'Grow Plus+', 'Ensure', 'Nutricare', 'XO', 'Horizon Organic', 'Fairlife', 'Silk', 'Alpro', 'Goodday', 'Anchor', 'Paul’s', 'Arla', 'Devondale', 'Parmalat', 'Borden', 'Dean Foods', 'Land O Lakes', 'TruMoo', 'Yili', 'Mengniu', 'Marigold']} value={form.brand}
                                            disablePortal disableClearable size='small'
                                            onChange={(_, value) => setForm(prev => ({ ...prev, brand: value }))}
                                            renderInput={(params) => <TextField {...params} />} />
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Price
                                        </span>
                                    </div>
                                    <div>
                                        <input
                                            value={form.price} onChange={(e) => setForm(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                                            type="number" id="price"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Promotion price
                                        </span>
                                    </div>
                                    <div>
                                        <input
                                            value={form.promotionPrice} onChange={(e) => setForm(prev => ({ ...prev, promotionPrice: parseInt(e.target.value) }))}
                                            type="number" id="promotionPrice"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Status
                                        </span>
                                    </div>
                                    <div>
                                        <Autocomplete options={['Active', 'Inactive']} value={form.status}
                                            disablePortal disableClearable size='small'
                                            onChange={(_, value) => setForm(prev => ({ ...prev, status: value }))}
                                            renderInput={(params) => <TextField {...params} />} />
                                    </div>
                                    <Stack direction='column' spacing={2}>
                                        <label className="text-sm text-back-500 font-bold">Thumbnail <span className="text-red-600 text-xl">*</span></label>
                                        {form.thumbnailUrl === null || form.thumbnailUrl === "" ? (
                                            <img
                                                className="h-4/5 w-[40%]"
                                                src="https://cdn3.iconfinder.com/data/icons/online-states/150/Photos-512.png"
                                            />
                                        ) : (
                                            <img
                                                alt="thumbnail-img"
                                                src={form.thumbnailUrl instanceof File ? URL.createObjectURL(form.thumbnailUrl) : form.thumbnailUrl}
                                                className="w-[50%] my-6"
                                            />
                                        )}
                                        {checkValid.thumbnail && <p className='text-red-500 text-xs mt-2'>This field is required!</p>}

                                        <Stack direction="row" spacing={2}>
                                            <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
                                                onClick={() => {
                                                    const fileInput = document.getElementById("fileInput");
                                                    if (fileInput) {
                                                        (fileInput as HTMLInputElement).click();
                                                    }
                                                }}>Upload image</button>

                                            <input id="fileInput" type="file" hidden={true} accept=".jpg, .jpeg, .png"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const files = e.target.files;
                                                    if (files && files.length > 0) {
                                                        const file = files[0];
                                                        setForm(prev => ({
                                                            ...prev,
                                                            thumbnailUrl: URL.createObjectURL(file)
                                                        }));
                                                        setImageSend(file);
                                                    }
                                                }}
                                            />
                                            {form.thumbnailUrl && (
                                                <button onClick={() => {
                                                    setForm(prev => ({ ...prev, thumbnailUrl: null }));
                                                    setImageSend(null);
                                                }}
                                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                                                    Clear image
                                                </button>
                                            )}
                                        </Stack>
                                    </Stack>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={handleUpdate}
                                        className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupProductDetail;
