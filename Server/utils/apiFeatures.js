class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    let keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    this.query.find({ ...keyword });

    return this;
  }

  filter() {
    let queryString = { ...this.queryString };

    // Removing fields from the query
    const removeFields = ["keyword", "limit", "page"];

    removeFields.forEach((el) => delete queryString[el]);

    let queryStr = JSON.stringify(queryString);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  paginate(resPerPage){
    const curretPage = Number(this.queryString.page) || 1;
    const skip = resPerPage * (curretPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }

    
}

module.exports = ApiFeatures;
