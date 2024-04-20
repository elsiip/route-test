import React from 'react';
import ProductForm from './index';
import { render, fireEvent, screen } from '@testing-library/react';

describe('ProductForm', () => {
  test('input Product Name', () => {
    const { getByLabelText } = render(<ProductForm />);
    const productNameInput = getByLabelText('Product Name');
    fireEvent.change(productNameInput, { target: { value: 'Testing' } });
    expect(productNameInput.value).toBe('Testing');
  });

  test('selecting Product Category', () => {
    const { getByLabelText, getByText } = render(<ProductForm />);
    const productCategorySelect = getByLabelText('Product Category');
    fireEvent.change(productCategorySelect, { target: { value: 'Fashion' } });
    expect(productCategorySelect.value).toBe('Fashion');
    getByText('Fashion'); 
  });

  test('selecting Product Freshness', () => {
    const { getByLabelText, getByText } = render(<ProductForm />);
    const brandNewRadio = getByLabelText('Brand New');
    const secondHandRadio = getByLabelText('Second Hand');
    const refurbishedRadio = getByLabelText('Refurbished');

    fireEvent.click(secondHandRadio);
    expect(secondHandRadio.checked).toBe(true);
    getByText('Second Hand'); 

    fireEvent.click(refurbishedRadio);
    expect(refurbishedRadio.checked).toBe(true);
    getByText('Refurbished'); 

    fireEvent.click(brandNewRadio);
    expect(brandNewRadio.checked).toBe(true);
    getByText('Brand New'); 
  });

  test('form values are remembered after change', () => {
    const { getByLabelText } = render(<ProductForm />);
    const productNameInput = getByLabelText('Product Name');
    const productCategorySelect = getByLabelText('Product Category');
    const brandNewRadio = getByLabelText('Brand New');
    const secondHandRadio = getByLabelText('Second Hand');
    const refurbishedRadio = getByLabelText('Refurbished');
    const addDescTextarea = getByLabelText('Additional Description');
    const productPriceInput = getByLabelText('Product Price');

    fireEvent.change(productNameInput, { target: { value: 'Testing' } });
    fireEvent.change(productCategorySelect, { target: { value: 'Fashion' } });
    fireEvent.click(secondHandRadio);
    fireEvent.change(addDescTextarea, { target: { value: 'Testing Description' } });
    fireEvent.change(productPriceInput, { target: { value: '12' } });

    expect(productNameInput.value).toBe('Testing');
    expect(productCategorySelect.value).toBe('Fashion');
    expect(secondHandRadio.checked).toBe(true);
    expect(addDescTextarea.value).toBe('Testing Description');
    expect(productPriceInput.value).toBe('12');
  });

//   test('validating Product Name should not be empty', () => {
//     const { getByLabelText, queryByText } = render(<ProductForm />);
//     const productNameInput = getByLabelText('Product Name');
//     fireEvent.change(productNameInput, { target: { value: '' } });
//     fireEvent.blur(productNameInput);
//     // Check if the error message is not present
//     expect(queryByText('Please enter a valid product name.')).toBeNull();
//   });

//   test('validating Product Name should not contain special characters', () => {
//     const { getByLabelText, getByText } = render(<ProductForm />);
//     const productNameInput = getByLabelText('Product Name');
//     fireEvent.change(productNameInput, { target: { value: 'Test@Product' } });
//     expect(productNameInput.value).toBe('Test@Product');
//     fireEvent.blur(productNameInput);
//     getByText('Product Name must contain only letters, numbers, and spaces.');
//   });

//   test('validating Product Name should not exceed 25 characters', () => {
//     const { getByLabelText, getByText } = render(<ProductForm />);
//     const productNameInput = getByLabelText('Product Name');
//     fireEvent.change(productNameInput, { target: { value: 'This is a very long product name that exceeds the character limit' } });
//     expect(productNameInput.value).toBe('This is a very long product name that exceeds the character limit');
//     fireEvent.blur(productNameInput);
//     getByText('Product Name must not exceed 25 characters.'); 
//   });

//   test('validating all form fields should not be empty', () => {
//     const { getByLabelText, queryByText } = render(<ProductForm />);
//     const productNameInput = getByLabelText('Product Name');
//     const productCategorySelect = getByLabelText('Product Category');
//     const addDescTextarea = getByLabelText('Additional Description');
//     const productPriceInput = getByLabelText('Product Price');
  
//     fireEvent.change(productNameInput, { target: { value: '' } });
//     fireEvent.change(productCategorySelect, { target: { value: '' } });
//     fireEvent.change(addDescTextarea, { target: { value: '' } });
//     fireEvent.change(productPriceInput, { target: { value: '' } });
  
//     fireEvent.blur(productNameInput);
//     fireEvent.blur(productCategorySelect);
//     fireEvent.blur(addDescTextarea);
//     fireEvent.blur(productPriceInput);
  
//     // Check if the error messages are not present
//     expect(queryByText('Please enter a valid product name.')).toBeNull();
//     expect(queryByText('Please select a product category')).toBeNull();
//     expect(queryByText('Please select a product freshness.')).toBeNull();
//     expect(queryByText('Please upload an image with JPG, JPEG, or PNG format.')).toBeNull();
//     expect(queryByText('Please enter a valid price.')).toBeNull();
//   });
});

