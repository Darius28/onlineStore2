import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, ButtonGroup } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import "./AddItems.css";
import { CATEGORIES } from "../../utils/Categories";
import ImagePreview from "../UI/ImagePreviewModal/ImagePreview";
import CancelButton from "../UI/Button/CancelButton";

export default function AddItems() {
  const [addItem, setAddItem] = useState(true);
  const [itemImg, setItemImg] = useState([]);
  const [amtImages, setAmtImages] = useState(0);
  const [itemCategory, setItemCategory] = useState([]);
  const [added, setAdded] = useState(0);
  const [showImgPreview, setShowImgPreview] = useState(false);

  const optionsList = CATEGORIES.map((category) => (
    <option value={category}>{category}</option>
  ));

  const showAddItemHandler = () => {
    setAddItem((prevState) => !prevState);
  };

  const addImageHandler = (e) => {
    console.log(e.target.files[0].name);
    setItemImg((prevState) => {
      let array = prevState;
      array.push({
        name: e.target.files[0].name,
        url: window.URL.createObjectURL(e.target.files[0]),
      });
      return array;
    });
    setAmtImages((prevState) => prevState + 1);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(itemImg);
    console.log(itemCategory);
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

  useEffect(() => {
    console.log(itemCategory);
    console.log("changed!!!");
  }, [added]);

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

  return (
    <div>
      <h1 className="center mt-3 mb-3">Your Inventory</h1>
      <div className="center">
        <Button variant="success" className="mb-3" onClick={showAddItemHandler}>
          Click to add Items
        </Button>
      </div>
      {addItem ? (
        <div className="add-items-form">
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Name: </Form.Label>
                <Form.Control type="text" required autoFocus value={2} />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Price: </Form.Label>
                <Form.Control type="number" required value={2} />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Description: </Form.Label>
                <Form.Control as="textarea" required value={2} />
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
    </div>
  );
}
