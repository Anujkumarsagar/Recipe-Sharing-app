'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, getAllCategories, deleteCategory, updateCategory } from '../store/categorySlice'

const RecipeAdminDashboard = () => {
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [editingCategory, setEditingCategory] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.user.theme)
  const catg = useSelector((state) => state.category.categories)


  useEffect(() => {
    dispatch(getAllCategories()).unwrap().then(data => {
      setCategories(data.categories || []);
    });
  }, [dispatch]);
  
  useEffect(() => {
    setCategories(catg)
    setSuccess('') // Clear messages on category update
    setError('')
  }, [catg])

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    if (!categoryDescription.trim()) {
      setError('Category description cannot be empty');
      return;
    }
  
    try {
      const payload = { name: categoryName, description: categoryDescription };
      await dispatch(createCategory(payload)).unwrap();
      setSuccess('Category added successfully');
      setCategoryName('');
      setCategoryDescription('');
      setError('');
      // Fetch updated categories after adding
      dispatch(getAllCategories());
    } catch {
      setError('Failed to add category');
    }
  }
  
  const handleEditCategory = (category) => {
    if (category) {
      setEditingCategory(category)
      setCategoryName(category.name)
      setCategoryDescription(category.description)
    } else {
      setCategoryName('')
      setCategoryDescription('')
      setEditingCategory(null)
    }
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()
    if (!categoryName.trim()) {
      setError('Category name cannot be empty')
      return
    }

    try {
      const categoryData = { name: categoryName, description: categoryDescription }
      await dispatch(updateCategory({ categoryId: editingCategory._id, categoryData })).unwrap()
      setSuccess('Category updated successfully')
      setCategoryName('')
      setCategoryDescription('')
      setEditingCategory(null) // Clear editing category

      //getallcategory
      dispatch(getAllCategories());
      setError('')
    } catch {
      setError('Failed to update category')
    }
  }

const handleDeleteCategory = async (id) => {
  try {
    await dispatch(deleteCategory(id)).unwrap();
    setSuccess('Category deleted successfully');
    setError('');
    // Fetch updated categories after deletion
    dispatch(getAllCategories());
  } catch (error) {
    console.error('Error deleting category:', error);
    setError('Failed to delete category');
    setSuccess('');
  }
}


  return (
    <div className={`max-w-4xl mx-auto mt-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-6 rounded-lg shadow-md`}>
      <h1 className="text-3xl font-bold mb-6">Recipe Admin Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Category Management</h2>

        <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="mb-6">
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="flex-grow px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder="Enter category description"
              className="flex-grow px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {editingCategory ? 'Update' : 'Add'} Category
            </button>
          </div>
        </form>

        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category._id} className="flex items-center justify-between p-3 text-black bg-gray-100 rounded-md">
              <div>{category.name}</div>
              <div>{category.description}</div>
              <div className="flex gap-2">
                {!editingCategory ? (
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditCategory(null)}
                    className="p-1 text-black hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteCategory(category._id)} // Pass the category's ID directly
                  className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Other Admin Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-bold mb-2 text-black">Manage Recipes</h3>
            <p className="text-gray-600 mb-4">Add, edit, or delete recipes from the database.</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Go to Recipes
            </button>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-bold mb-2 text-black">User Management</h3>
            <p className="text-gray-600 mb-4">Manage user accounts and permissions.</p>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Manage Users
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700" role="alert">
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700" role="alert">
          <p>{success}</p>
        </div>
      )}
    </div>
  )
}

export default RecipeAdminDashboard;
