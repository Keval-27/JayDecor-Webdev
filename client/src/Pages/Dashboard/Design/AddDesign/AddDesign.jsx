import React, { useState } from 'react';
import InputField from './Inputfield';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAddDesignMutation } from '../../../../Redux/Features/Designs/designsApi';

const AddDesign = () => { 

  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [images, setImages] = useState([]); // State for multiple images
  const [addDesign, { isLoading }] = useAddDesignMutation();

  const onSubmit = async (data) => {
    const newDesignData = {
      ...data,
      img: images, // Add the images array to the project data
      type: data.type || 'All', // Default type if not selected
    };

    try {
      await addDesign(newDesignData).unwrap();
      Swal.fire({
        title: "Design added",
        text: "Your Design is uploaded successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK!",
        
      });
      reset();
      setImages([]); // Clear images after submission
    } catch (error) {
      console.error('Error adding Design:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to add the Design. Please try again.',
        icon: 'error',
      });
    }
  };

  const handleAddImage = () => {
    setImages([...images, '']); // Add a new empty entry for images
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };
  

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Design</h2> 

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter project title"
          register={register}
        />

        {/* Reusable Select Field for Type */}
        <SelectField
          label="Type"
          name="type"
          options={[
            { value: '', label: 'Choose A Type' },
            { value: 'Livingroom', label: 'Livingroom' },
            { value: 'Bedroom', label: 'Bedroom' },
            { value: 'kids Bedroom', label: 'Kids Bedroom' },
            { value: 'Kitchen', label: 'Kitchen' },
            { value: 'Wardrobe', label: 'Wardrobe' },
            { value: 'Diningroom', label: 'Diningroom' },
            { value: 'Bathroom', label: 'Bathroom' },
            { value: 'Office', label: 'Office' },
            { value: 'Other', label: 'Other' },
          ]}
          register={register}
        />

        {/* Images Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
          {images.map((img, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="w-full"
              />
              {img && (
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="bg-red-500 text-white rounded px-3 py-1 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-blue-500 text-white rounded px-4 py-2 text-sm"
          >
            Add Image
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
          {isLoading ? <span>Adding...</span> : <span>Add Project</span>}
        </button>
      </form>
    </div>
  );
};

export default AddDesign; 