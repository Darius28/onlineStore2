import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Row, Col, ButtonGroup } from "react-bootstrap";
import "./AddItems.css";
import { CATEGORIES } from "../../utils/Categories";
import ImagePreview from "../UI/ImagePreviewModal/ImagePreview";
import CancelButton from "../UI/Button/CancelButton";
import axios from "axios";
import { BackendUrl } from "../../utils/BackendUrl";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import Inventory from "./Inventory";
import ChangeStoreName from "../UI/ChangeStoreNameModal/ChangeStoreName";

export default function AddItems() {
  const [addItem, setAddItem] = useState(false);
  const [itemImg, setItemImg] = useState([]);
  const [itemImgB64, setItemImgB64] = useState([]);
  const [amtImages, setAmtImages] = useState(0);
  const [itemCategory, setItemCategory] = useState([]);
  const [added, setAdded] = useState(0);
  const [showImgPreview, setShowImgPreview] = useState(false);
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const [itemsData, setItemsData] = useState();
  const [showShopNameChange, setShowShopNameChange] = useState(false);

  const optionsList = CATEGORIES.map((category) => (
    <option value={category}>{category}</option>
  ));

  const showAddItemHandler = () => {
    setAddItem((prevState) => !prevState);
  };

  const getData = async () => {
    const { data } = await axios.get(`${BackendUrl}/get-seller-items`, {
      withCredentials: true,
    });
    setItemsData(data.items);
    // console.log(data.items);
  };

  const addImageHandler = (e) => {
    console.log(e.target.files[0]);
    const previewUrl = window.URL.createObjectURL(e.target.files[0]);
    Resizer.imageFileResizer(
      e.target.files[0],
      858,
      432,
      "JPEG",
      100,
      0,
      async (uri) => {
        setItemImgB64((prevState) => {
          let array = prevState;
          array.push({
            b64Uri: uri,
            url: previewUrl,
          });
          return array;
        });
      }
    );

    setItemImg((prevState) => {
      let array = prevState;
      array.push({
        imageObj: e.target.files[0],
        url: previewUrl,
      });
      return array;
    });
    setAmtImages((prevState) => prevState + 1);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const lsData = JSON.parse(localStorage.getItem("user"));
      // const email = lsData.email;
      const shop_name = lsData.shop_name;
      const name = nameRef.current.value;
      const price = priceRef.current.value;
      const description = descriptionRef.current.value;
      const { data } = await axios.post(
        `${BackendUrl}/add-item`,
        {
          name,
          price,
          description,
          imagesBase64: itemImgB64,
          itemCategory,
          shopName: shop_name,
        },
        {
          withCredentials: true,
        }
      );

      nameRef.current.value = "";
      priceRef.current.value = "";
      descriptionRef.current.value = "";
      setItemCategory([]);
      setItemImg([]);
      setAdded(0);
      setAmtImages(0);
      setItemImgB64([]);
      toast.success("Item added successfully!");
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const addCategoryHandler = (e) => {
    const selectedValue = e.target.value;
    setItemCategory((prevState) => {
      let array;
      array = prevState;
      const itemExists = array.findIndex((item) => {
        return item === selectedValue;
      });
      if (itemExists !== -1) {
        return array;
      }
      console.log("itemExists: ", itemExists);
      array.push(selectedValue);
      return array;
    });
    setAdded((prevState) => prevState + 1);
    const selectCategory = document.getElementById("select-category");
    selectCategory.selectedIndex = 0;
  };

  const removeCategoryHandler = (cat) => {
    setItemCategory((prevState) => {
      let array;
      array = prevState;
      let array2 = array.filter((category) => category !== cat);
      return array2;
    });
    setAdded((prevState) => prevState - 1);
  };

  const showImgPreviewHandler = () => {
    setShowImgPreview(true);
  };

  const closeImgPreviewHandler = () => {
    setShowImgPreview(false);
  };

  const removePictureHandler = (url) => {
    setItemImg((prevState) => {
      let array2 = prevState.filter((item) => item.url !== url);
      return array2;
    });

    setItemImgB64((prevState) => {
      let array = prevState.filter((item) => item.url !== url);
      return array;
    });

    setAmtImages((prevState) => {
      if (prevState === 1) {
        closeImgPreviewHandler();
        return 0;
      } else {
        return prevState - 1;
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const changeStoreNameHandler = () => {
    setShowShopNameChange(true);
  };

  const closeChangeShopModalHandler = () => {
    setShowShopNameChange(false);
  };

  return (
    <div>
      {showShopNameChange ? (
        <ChangeStoreName
          oldShopName={JSON.parse(localStorage.getItem("user")).shop_name}
          onCloseModal={closeChangeShopModalHandler}
          setShowShopNameChange={setShowShopNameChange}
        />
      ) : null}
      <div className="store-name-container">
        <h1 className="center mt-3 mb-3">
          {JSON.parse(localStorage.getItem("user")).shop_name}
        </h1>
        <span
          className="store-change-name-link"
          onClick={changeStoreNameHandler}
        >
          Change Name
        </span>
      </div>
      <div className="center">
        <Button variant="success" className="mb-3" onClick={showAddItemHandler}>
          {addItem ? "Hide Add Items" : "Click to Add Items"}
        </Button>
      </div>
      {addItem ? (
        <div className="add-items-form">
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Name: </Form.Label>
                <Form.Control type="text" required autoFocus ref={nameRef} />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Price: </Form.Label>
                <Form.Control type="number" required ref={priceRef} />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Description: </Form.Label>
                <Form.Control as="textarea" required ref={descriptionRef} />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Images: </Form.Label> <br />
                <div className="input-file-container">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={addImageHandler}
                    name="imgCollection"
                  />
                  {amtImages === 0 ? (
                    <span className="red">Images Added: 0</span>
                  ) : (
                    <>
                      <span className="green">Images Added: {amtImages}</span>
                      <span className="link" onClick={showImgPreviewHandler}>
                        Click to Preview
                      </span>
                      {showImgPreview ? (
                        <ImagePreview
                          onCloseModal={closeImgPreviewHandler}
                          images={itemImg}
                          onRemovePicture={removePictureHandler}
                        />
                      ) : null}
                    </>
                  )}
                </div>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="2" className="mb-3">
                <Form.Label>Choose Category (max 3): </Form.Label>
                <select
                  onChange={addCategoryHandler}
                  disabled={itemCategory.length === 3}
                  className="form-control"
                  id="select-category"
                >
                  <option value="">---Select Category---</option>
                  {optionsList}
                </select>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>Added Categories: </Form.Label>
                <br />
                {itemCategory.length === 0 ? (
                  <p className="no-category-added-text">
                    You haven't added categories yet.
                  </p>
                ) : (
                  <ButtonGroup>
                    {itemCategory.map((category) => {
                      return (
                        <div className="button-container">
                          <div className="category-button-container">
                            <button className="category-button">
                              {category}
                            </button>
                            <CancelButton
                              onClick={removeCategoryHandler.bind(
                                null,
                                category
                              )}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </ButtonGroup>
                )}
              </Form.Group>
            </Row>
            <div className="center">
              <Button variant="primary" type="submit">
                Add Item
              </Button>
            </div>
          </Form>
        </div>
      ) : null}
      <h1 className="center mb-3 mt-3">Your Inventory: </h1>
      <Inventory itemsData={itemsData} edit={true} />
    </div>
  );
}
