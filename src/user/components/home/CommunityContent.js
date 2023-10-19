import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";
import { fetchBannerWithPageAndSection } from "../../services/userService";
import { useSelector } from "react-redux";

const CommunityContent = () => {
 
  return (
    <>
    <div id="comminity-banners-section" className="">
      <div className="container">
        <div className="jumbotron-comminity-banner img-fluid navbar-scroll">
        </div>
      </div>
    </div>

    <div id="community-text">
      <div className="container pt-5 pb-5 ">
      <label className="pb-3 border-bottum-solid">Brahmin</label>
        <p className="">
        According to Abraham Eraly, "Brahmin as a varna hardly had any presence in historical records before the Gupta Empire era" (3rd century to 6th century CE), when Buddhism dominated the land. "No Brahmin, no sacrifice, no ritualistic act of any kind ever, even once, is referred to" in any Indian texts between third century BCE and the late first century CE. He also states that "The absence of literary and material evidence, however, does not mean that Brahmanical culture did not exist at that time, but only that it had no elite patronage and was largely confined to rural folk, and therefore went unrecorded in history".[17] Their role as priests and repository of sacred knowledge, as well as their importance in the practice of Vedic Shrauta rituals, grew during the Gupta Empire era and thereafter.[17]

        However, the knowledge about actual history of Brahmins or other varnas of Hinduism in and after the first millennium is fragmentary and preliminary, with little that is from verifiable records or archeological evidence, and much that is constructed from ahistorical Sanskrit works and fiction. Michael Witzel writes,

       <br/> Toward a history of the Brahmins: Current research in the area is fragmentary. The state of our knowledge of this fundamental subject is preliminary, at best. Most Sanskrit works are a-historic or, at least, not especially interested in presenting a chronological account of India's history. When we actually encounter history, such as in Rajatarangini or in the Gopalavamsavali of Nepal, the texts do not deal with brahmins in great detail.
      <br/>
      —Michael Witzel, Review (1993)[18]
        </p>
      </div>
    </div>

    </>
  );
};

export default CommunityContent;
