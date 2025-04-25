/* eslint-disable react/prop-types */
export const withLoading = (Component) => {
  function ComponentWithLoading (props) {
    const { items } = props

    if (items.length === 0) {
      return (
        <h2>Loading...</h2>
      )
    }

    return (
      <Component {...props} />
    )
  }

  return ComponentWithLoading
}
