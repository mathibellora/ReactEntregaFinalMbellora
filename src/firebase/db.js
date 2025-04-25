import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore'
import { db } from './config'

export const getProducts = async () => {
  const productsCollection = collection(db, 'books')
  const querySnapshot = await getDocs(productsCollection)
  
  const products = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  return products
}

export const getProductById = async (id) => {
  const productDoc = doc(db, 'books', id)
  const productSnapshot = await getDoc(productDoc)

  if (productSnapshot.exists()) {
    return { id: productSnapshot.id, ...productSnapshot.data() }
  } else {
    throw new Error('Producto no encontrado')
  }
}

export const getProductsByCategory = async (categoryId) => {
  const productsCollection = collection(db, 'books')
  const categoryQuery = query(productsCollection, where('category', '==', categoryId))
  const querySnapshot = await getDocs(categoryQuery)

  const products = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  return products
}

export const getCategories = async () => {
  const productsCollection = collection(db, 'books')
  const querySnapshot = await getDocs(productsCollection)

  const allCategories = querySnapshot.docs.map(doc => doc.data().category)
  const uniqueCategories = [...new Set(allCategories)]

  return uniqueCategories
}

export const getOrders = async () => {
  const ordersRef = collection(db, 'orders')
  const querySnapshot = await getDocs(ordersRef)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}
