import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";

const ProductTag = (props) => {
    const router = useRouter();

    const searchTag = () => {
        router.push({
            pathname: "/market",
            query: {
                category: props.category,
                tags: props.tag,
            },
        });
    }
    
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
                onClick={searchTag}
            >
            {props.tag}
            </Button>
        </>
    );
}

export default ProductTag;