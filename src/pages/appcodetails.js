import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const Post = ({ data }) => {
    return <Layout><h1>{data.name}</h1></Layout>;
};

export const query = graphql`
    query($appcoid: Int) {
        apps(id__normalized: { eq: $appcoid }) {
            ...AppInformation
        }
    }
`;

export default Post;
