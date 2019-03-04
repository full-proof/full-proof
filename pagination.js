// ADDRESS BAR: /products?page=2&category=utensils

class AllProducts extends React.Component {
  componentDidMount () {
    fetchCurrentPage(this.props.location.search)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.location.search != this.props.location.search) {
      fetchCurrentPage(this.props.location.search)
    }
  }
  fetchCurrentPage (queryString) {
    // queryString  "?page=2&category=utensils"
    const query = parseQueryString(queryString)
    //  quey === { page: 2, category: 'utensils' }
    this.props.fetchProducts(query)
  }
}

// only keep current page on client: { products: [] }
// try to cache pages as you go:
// { page-1-utensils: [], page-1-ceramics: [] }
function fetchProducts (query) {
  return async funcition (dispatch) {
    // have we fetched this combo of page/category yet?
    const result = await axios.get(`/products?page/${query.page}&category=${query.category}`)
    // dispatch with current page
  }
}

// get URL in
// sql query just the right data
// return <html>

app.get('/products', async (req, res, next) => {
  const page = req.params.page || 1 // GET /products?page=2
  const perPage = 10
  // limit, offset
  // perPage
  // page
  // limit = perPage
  // offset = (page - 1) * perPage
  // SELECT * from products limit 10 offset 30 order by updatedAt
  const products = await Product.findAll({
    limit: limit,
    offset: offset,
  })
  res.json({
    products,
    page: page,
    perPage: perPage,
    totalCount: await Product.count(),
  })
})
