import React from "react";
import { graphql } from "gatsby";
import App from "../components/app";
import Layout from "../components/layout";
import {numberFormat} from "../components/app"

const AppCo = ({ data }) => {
    return <Layout>
    <h1>All Open Source Blockstack Apps</h1>
    <ul>
      <li>Total number: {data.allApps.totalCount}</li>
      <li>Total rewards: {numberFormat.format(data.allApps.edges.reduce((sum, d) => sum + d.node.lifetimeEarnings,0))}</li>
    </ul>
    <ul>
      {data.allApps.edges.map(function(d, idx){
         return (<li key={idx}><App data={d.node}/></li>)
       })}
    </ul>
    </Layout>;
};

export const query = graphql`
    query foss {
        allApps(filter:{openSourceUrl:{nin:["", null]}}, sort:{fields:[fields___lastCommit, name], order:[DESC, ASC]}) {
          totalCount
          edges {
            node {
                  ...AppInformation
                }
              }
            }
          }
`;


export default AppCo;

