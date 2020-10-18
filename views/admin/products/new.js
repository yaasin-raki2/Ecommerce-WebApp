const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
    return layout({
        content: `
            <form method="POST" enctype="multipart/form-data">
                <input placeholder="title" name="title"/>
                ${getError(errors, 'title')}
                <input placeholder="price" name="price"/>
                ${getError(errors, 'price')}
                <input type="file" name="image"/>
                <button>Submit</button>
            </form>
        `
    })
}