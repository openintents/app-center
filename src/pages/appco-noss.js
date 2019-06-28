import React from "react";
import { graphql } from "gatsby";
import App from "../components/app";
import Layout from "../components/layout";
import {numberFormat} from "../components/app"

const AppCo = ({ data }) => {
    return <Layout>
    <h1>All Closed Source Blockstack Apps</h1>
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
    query noss {
        allApps(filter:{openSourceUrl:{in:["", null,
        "https://github.com/zincwork/contracts", "https://github.com/kkomaz/debut",
        "https://github.com/springrole", "https://github.com/dmailonline", "https://github.com/blockcred",
        "https://github.com/blackholeorganization", "https://github.com/danparamov/mila-crm", 
        "https://github.com/KevinNTH"
      ]}, miningReady:{eq:true}}, sort:{fields:[name]}) {
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

