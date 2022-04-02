import Button from "react-bootstrap/Button";

const ProductTag = ({ tag }) => {
    return (
        <>
           <style type="text/css">
                {`
                    .btn-tag {
                        border: 1px solid blue;
                        color: blue;
                        border-radius: 1rem;
                        margin: 0.25rem;
                    }
                `}
            </style> 
            <Button
                className="product-tag"
                variant="tag"
            >
            {tag}
            </Button>
        </>
  );
}

export default ProductTag;