import React from 'react';

import {api} from '../../utils/keys/api.routes'

export const EvidencesGalery = ({evidences}) => {

    return(
        <div className="container-evidences-galery col-md-12 mt-2">
            {
                evidences.map(evidence => {
                    return evidence.aEvidence.map(aEvidence => {
                        return(
                            <div className="mb-2" key={aEvidence._id}>
                                <div><b>Fecha de registro:</b> {aEvidence.dRegistered}</div>
                                <div><b>Nota:</b> {aEvidence.tNote}</div>
                                <div className="row col-md-12 mt-2">
                                    {
                                        aEvidence.aUri.map((uri, index) => {
                                            let namefile = uri.split("/");
                                            return(
                                                <div className="col-md-4" key={index}>
                                                    <a href={`${api.API}/documents/attached/${namefile[3]}/${namefile[4]}/${namefile[5]}`} 
                                                        target="_blank" 
                                                        className="ml-1" 
                                                        rel="noopener noreferrer">
                                                        <img src={`${api.API}/documents/attached/${namefile[3]}/${namefile[4]}/${namefile[5]}`} width="100%" alt="Evidencias"/>
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                            </div>
                        )
                    })
                    
                })
            }
        </div>
    )
}