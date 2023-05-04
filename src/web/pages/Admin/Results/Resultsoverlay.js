import React, { useState, useEffect } from "react";
import Overlay from "recruitment-components/Overlay/Overlay.js";
import TableOne from "recruitment-components/TableOne/TableOne.js";
import Logo from "recruitment-images/h4.png";

const ResultOverlay = (props) => {

  const testResultData = props.testResultData;

  const intellectual = {
    blackPixels: {
      white:
        "Intellectually, they have a high level of abstraction which enables the candidate to project and program in the short, medium and long terms.",

      black:
        "The candidate shows decreased objectivity levels to some extent, exhibiting certain difficulties to keep their distance and see situations in a global view.",
    },

    legibility: {
      legible: "Clarity in reasoning",

      illegible: "",
    },

    letterTilt: {
      "moderately inverted" : "",

      regressive : "",

      inverted: "",

      vertical : "",

      "moderately inclined" : "",

      inclined: "",

      laid: "",

    },

    lineSlope: {

      "very ascending lines": "",

      "ascending lines": "",

      correct: "",

      "descending lines": "",

      "very descending lines": "",
    },

    pressure: {
      over: "",

      around: "",

      "less than": "",
    },

    proportionalityRatio: {
      correct:
        "The candidate shows a thinking style that is powered by reason. They tend to be objective and impartial. They have abilities for abstract and theoretical comprehension, showing good critical analysis skills. Their creative capacity may be decreased.",

      wider: "",

      tall: "",
    },

    shape : { 
      straight : "",
  
      curved : ""},

    seperationBetweenLetters: {
      short: "",

      correct: "",

      long: "",
    },

    seperationBetweenWords: {
      short: "",

      correct:
        "The candidate shows an adequate flow of ideas, being able to reason normally.",

      long: "Intellectually, they are impressive as a reflective person. Has an abstraction level that allows to project and schedule issues at the short, medium and long terms.",
    },
    signature: { far: "",
  
          near : "",

          correct : ""},

    signatureLegibility: { legible: "", illegible: "" },

    signaturePosition: {
      left: "",

      center: "",

      right: "",
    },

    size: {
      correct:
        " In relation to their intellectual ability, the candidate shows good balance between global and practical thinking. They are able to see the abstract context, as well as the details involved.",
      small: "",

      large : "",

      "very large" : "",

      "very small": "",
    },

    sizeRegularty: {
      regular: "",

      irregular: "",
    },

    signatureDistanceToText: {
      near: "Intellectually, the candidate has practical and realist thinking, which allows them to set, for themselves and others, tangible and reachable goals. ",

      far: "",

      correct: "",
    },

    sizeVariablity: {
      increasing:
        "Intellectually, the person may show a certain lack of logic and critical thinking, impacting their ability for analysis.",

      decreasing:
        "The candidate shows a good domain of logical thinking and critical judgment. They have a good observation ability and need to go the root of situations or problems. High analysis ability.",

      normal: "",
    },

    speed: { 
      slow : "The candidate shows a reflection thinking style that is more oriented to logic than intuition.",
  
      correct : "Possesses intellectual abilities within an average range, with an appropriate combination of logical and intuitive thinking styles. In this sense, they exhibit a flexible (theoretical and practical) and coherent thinking style. There is no great inventiveness or originality, but we find realistic imagination, which enables them to perform tasks of a certain depth and provide new solutions to arising problems. The candidate has a good memory and an adequate common sense. Emotionally, their moods are stable and within the appropriate ranges, exhibiting proper anxiety management.In the work setting, the candidate has an intermediate work rhythm, that is, not in a hurry but not stopping. They exhibit abilities for both subordinate and managerial positions, possessing a wide field of action.Their relationship styles are usually controlled.",

      fast : "Intellectually, the candidate shows high mental dynamism. "
  },

    textVariablity: {
      variable: "",

      steady:
        "It is important to note that they have intuitive thinking and good improvisation skills. They are versatile, creative and imaginative.",
    },
  };

  const emotional = {
    blackPixels: {
      white:
        "They tend to be a more reflective than expressive and spontaneous person. In this sense, they tend to control their behavior and their contact levels. This is a person that thinks things through before expressing them.",

      black:
        "",
    },

    legibility: {
      legible: "The candidate shows a healthy general psychological context, showing an adequate emotional stability and self-control.",

      illegible:
        "The candidate has a general psychological context that is somewhat unstable and may involve difficulties in their adaptation and emotional control. ",
    },

    shape : { straight : "",
  
    curved : ""},

    letterTilt: {
      "moderately inverted" : "",

      regressive : "",

      inverted: "They are cautious and careful in all aspects of their lives. They are guided by high moral standards built based on their own experience. The candidate is not influenced by the environment and, in general, likes solitude.",

      vertical : "",

      "moderately inclined" : "",

      inclined: "In emotional terms, the candidate shows a good level of maturity, presenting themselves as a spontaneous and active person.",

      laid: " The candidate shows homogeneous moods and emotional stability.",

    },

    lineSlope: {
      "very ascending lines": "The candidate exhibits a possible manic state and generalized altered state.",

      "ascending lines": " Emotionally, the candidate shows an optimistic character and ability to withstand difficult situations.",

      correct: "The candidate shows an uniform and stable mood, without significant oscillations. Has the ability to withstand emotionally complex situations.",

      "descending lines": "The candidate shows a certain tendency towards exhaustion, appearing as a lower energy level person. This could be showing a tendency towards discouragement and pessimism. ",

      "very descending lines": "The candidate exhibits significant discouragement states which are crystallized into a depressive personality. This trait impacts both the work and relational aspects.",
    },

    pressure: {
      over: "",

      around: "",

      "less than": "",
    },

    proportionalityRatio: {
      correct:
        "Emotionally, the candidate is an ethical, prudent and discreet person. Shows good self-control.",

      wider: "The candidate has an expansive and open character. They are usually honest, spontaneous and with self-confidence.",

      tall: "Emotionally, the candidate shows a sense of pride regarding themselves and their abilities. Even though they may come off as vain regarding the same. The candidate shows a need for independence.",
    },

    seperationBetweenLetters: {
      short: "In conjunction with other indicators, it may be indicative of a depressive state. ",

      correct: "",

      long: "",
    },

    seperationBetweenWords: {
      short: "The candidate shows excessive self-control.",

      correct:
        "",

      long: "",
    },
    signature: { far: "",
  
    near : "",

    correct : ""},

    signatureLegibility: { legible: "", illegible: "" },

    signaturePosition: {
      left: "Emotionally, this is a person that is easily frustrated. In the face of problematic situations, they may get somewhat paralyzed. A certain lack of self-confidence is observed. ",

      center: "The candidate shows proper affection control level, showing independence both in ideas and affections. Centered person. Difficulty in evolving towards maturity.",

      right: " Emotionally, the candidate demonstrates a cheerful and optimistic mood, with a good level of self-confidence.",
    },

    size: {
      correct:
        " In relation to their intellectual ability, the candidate shows good balance between global and practical thinking. They are able to see the abstract context, as well as the details involved.",
      small: "",

      large : "",

      "very large" : "",

      "very small": "The candidate shows a predominance of feeling and intuition. They are an adaptable, spontaneous and versatile person, but may show difficulties in his capacity for self-control.",
    },

    sizeRegularty: {
      regular: "The candidate shows good emotional stability. They usually appear as a mature and consistent person. They are trustworthy.",

      irregular: "The candidate shows a predominance of feeling and intuition. They are an adaptable, spontaneous and versatile person, but may show difficulties in his capacity for self-control.",
    },

    signatureDistanceToText: {
      near: "",

      far: "",

      correct: "Emotionally, the candidate is observed to be in agreement between what they want to achieve and the capabilities they have to achieve it, showing balance and healthy self-esteem.",
    },

    sizeVariablity: {
      increasing:
        "Intellectually, the person may show a certain lack of logic and critical thinking, impacting their ability for analysis.",

      decreasing:
        "The candidate shows a good domain of logical thinking and critical judgment. They have a good observation ability and need to go the root of situations or problems. High analysis ability.",

      normal: "",
    },

    speed: { 
      slow : "",
  
      correct : "In emotional terms, the candidate shows a good balance. ",

      fast : ""
  },

    textVariablity: {
      variable: "The candidate has a positive domain of their will, exhibiting emotional stability and maturity. The person shows consistency both in their ideas as well as in their emotions.",

      steady:
        "A certain predominance of emotions over reason is observed in the candidate, and they may have fluctuations in willpower. In this sense, they may present themselves as a person who can be influenced by others or by the emotional context in which they develop. ",
    },
  };

  const relational = {
    blackPixels: {
      white:
        "In relational terms, the candidate tends to restrict contact with others. They prefer silence and solitude.",

      black:
        "In the relational context, the candidate shows the need of proximity or getting close to other people. Shows ease for socialization and likes proximity to others.",
    },

    legibility: {
      legible: "",

      illegible:
        "",
    },

    letterTilt: {
      "moderately inverted" : "",

      regressive : "",

      inverted: "In relational terms, the candidate shows a defensive and protection stance to others and various situations. This may make them come across as a shy, passive, reserved or oppositional person. In a relationship, they may assume a somewhat dry and hard attitude. They are usually selective regarding others.In intellectual terms, they have a good abstraction ability.",

      vertical : "",

      "moderately inclined" : "",

      inclined: "They are a person who likes to be in contact with other people and to work in groups. They feel a genuine interest for others and is concerned about making them feel good. Has open and spontaneous behavior habits.",

      laid: "",

    },

    shape : { straight : "",
  
    curved : ""},

    lineSlope: {
      "very ascending lines": "",

      "ascending lines": "",

      correct: "",

      "descending lines": "When interacting with others, a stubborn character and a certain intransigence towards the opinions and behaviors of others may predominate.",

      "very descending lines": "",
    },

    pressure: {
      over: "",

      around: "",

      "less than": "",
    },

    proportionalityRatio: {
      correct:
        "The candidate shows a thinking style that is powered by reason. They tend to be objective and impartial. They have abilities for abstract and theoretical comprehension, showing good critical analysis skills. Their creative capacity may be decreased.",

      wider: "",

      tall: "",
    },

    seperationBetweenLetters: {
      short: "In relational terms, the candidate shows a rather introverted style. They manage to create bonds with others, but tend to be more shy and reserved. The person is one of few relationships, but those that are established are usually deep and long term. It is not a person who trusts in the first instance. They take their time to get to know and open up to others. ",

      correct: " In relational terms, the candidate shows a good relationship level with others. They are usually located in a mid-zone between introversion and extroversion, properly adapting to the requirements of each relationship. They face short and long term bonds in a good manner.",

      long: "In relational terms, the candidate shows an expansive character, they are usually an honest and open person, bonding with others spontaneously and with self-confidence. Their interactions, in this sense, are more superficial than deep, however, they show a good ability to create bonds. ",
    },

    seperationBetweenWords: {
      short: "Relationally, a certain degree of self-doubt is observed, which makes them seek recognition and approval from others. They have the ability to integrate into work teams and groups in general, even when they tend to depend on others.",

      correct:
        " The candidate bonds with others fluently and with no apprehensions. They are interested in people and tend to cooperate with them.",

      long: "The candidate shows a certain tendency to isolation. Is usually very selective when in contact with others.",
    },
    signature: { far: "",
  
    near : "",

    correct : ""},

    signatureLegibility: { legible: "They have the ability to look at themselves and others, showing high levels of empathy in their relationships.", illegible: "" },

    signaturePosition: {
      left: " The candidate exhibits a natural tendency towards a more introvert social interaction. ",

      center: "The candidate shows a certain control in their social drive. ",

      right: "",
    },

    size: {
      correct:
        "",
      small: "Is usually introverted and shy, in occasions, insecure and somewhat anxious.May show issues in self-esteem.",

      large : "",

      "very large" : "",

      "very small": " The candidate exhibit significant limitations in their self-esteem. They tend to be extremely introverted, hindering their ability to work with others.",
    },

    sizeRegularty: {
      regular: "",

      irregular: "",
    },

    signatureDistanceToText: {
      near: ": Relationally, the candidate integrates socially, tending to adopt currents of ideas, tastes and principles that are dominant in the group they are joining. They adopt the group's ways and relationship styles as their own. They come across as a natural and social person, easy going and with the ability to admit to their own mistakes. Creates good social connections.",

      far: "In relational terms, the candidate shows a certain tendency to isolate themselves, with a predilection for solitary spaces. Shows behaviors typically oriented to introversion, creating very formal and protocol-guided interactions. Maintains independence in their way of thinking, being difficult to influence.",

      correct: "In relational terms, the candidate shows proper balance and equilibrium in their personal and social lives. Social relationships are placed in the right spot.",
    },

    sizeVariablity: {
      increasing:
        "",

      decreasing:
        "The candidate tends to bond empathetically, becoming an keen and curious observer in regards to others. They are smart in terms of relationships, though also cautious and tactful. They may come across as a shy and somewhat insecure person.",

      normal: "",
    },

    speed: { 
      slow : "They are a quiet and realistic person, with common sense, a sense of practicality and simplicity.They tend to focus easily and have a good memory.They show a high preference for administrative positions or those that involve sorting and classifying data. They tend to feel more comfortable when others make decisions and require clarity on what they have to do. Not a person for high-stress, fast-paced jobs.The candidate exhibits traits related to introversion, demonstrating emotional stability and calm attitudes, which are stable over time.In relational terms, the candidate tends to create simple and plain bonds.",
  
      correct : "",

      fast : ""
  },

    textVariablity: {
      variable: "",

      steady:
        "A predominantly affective character is observed. They are spontaneous and are not usually guided by conventional logic. Along with other factors, they may show some level of nervousness, impatience and inconstancy, with their behavior being difficult to predict. ",
    },
  };

  const work = {
    blackPixels: {
      white:
        "",

      black:
        "In the work setting, the candidate shows good concentration ability, sense of economy, preparation and ability to conduct detailed and thorough analysis.",
    },

    shape : { 
      straight : " The candidate shows self-confidence and resolutive capacity. They are a person with a strong character and are directly oriented to the achievement of goals and objectives. The person tends to achieve their objectives due to their strong character and directionality.",
  
    curved : "The candidate tends to achieve their objectives and goals using more interpersonal skills. They make use of their niceness to get where they want to go, tending to win the credibility of others as a support.They have artistic abilities and / or a high sense of aesthetics. "},

    legibility: {
      legible: "Demonstrates adequate organizational and planning skills within the work environment. Is organized and shows clarity in their ideas, enabling them for adequate reasoning. They are cautious and follow a work-flow. ",

      illegible:
        "It is important to note that they have intuitive thinking and good improvisation skills. They are versatile, creative and imaginative.",
    },

    letterTilt: {
      "moderately inverted" : "",

      regressive : "",

      inverted: "",

      vertical : "",

      "moderately inclined" : "",

      inclined: "Usually works cooperatively, exposing their points of view, as well as integrating and accepting others’ points of view. Has an adequate level of risk acceptance and is motivated by new projects.It is an easily motivated person.",

      laid: "",

    },

    lineSlope: {
      "very ascending lines": "",

      "ascending lines": "In the work setting, the candidate shows creativity, god imagination and an adequate work intensity, being able to withstand high work loads.Their aspirational levels are high, always seeking to advance and perfect.They show preference for leadership positions. They have good communication skills and are willing to exchange ideas and opinions.",

      correct: "The candidate shows a stable and consistent personality structure, showing a balanced attitude in all aspects, both work-related and personal.Their productivity levels is steady and they are eminently practical. High perseverance. Is fit to undertake leadership and subordination positions, depending on the time and circumstances.",

      "descending lines": "In the work setting, they are easily exhausted, showing difficulties to withstand pressure and high work loads. Their ability to take the initiative and their general aspirations level are decreased.",

      "very descending lines": "In the work setting, the candidate is passive and has limited abilities to project over time. Their aspirational level is low, and are easily frustrated.",
    },

    proportionalityRatio: {
      correct:
        "",

      wider: "In the work setting, they may lose some focus and be impatient.",

      tall: "",
    },

    seperationBetweenLetters: {
      short: "",

      correct: "",

      long: "",
    },

    seperationBetweenWords: {
      short: "In the work setting, it is observed that the candidate is a good communicator and has the ability to persuade through words and ideas. They have a high sense of economy and ease for decision making processes.",

      correct:
        "",

      long: "",
    },
    signature: { far: "",
  
    near : "",

    correct : ""},

    signatureLegibility: { legible: " The candidate has an adequate level of awareness regarding their own capabilities and limitations.In the work setting, they are observed to be an authentic and responsible person, showing clarity in their ideas and objectives. They have a high sense of duty and responsibility. This is an honest, trustworthy and authentic person, who places great value on the word spoken.", illegible: " In the work setting, the person shows a certain difficulty to face complex and conflictive situations, tending to avoid them and not engage in them. This situation may hinder their ability to fully assume responsibility." },

    signaturePosition: {
      left: "",

      center: "They appear as a prudent candidate when making decisions. Decisions that may be deferred over time.",

      right: "The candidate shows a high level of initiative, which at times could be adopted as a somewhat more aggressive position. They are enthusiastic and really work to achieve their aspirations.",
    },

    size: {
      correct:
        "They have the ability to plan and bring to action.They have an appropriate self-concept and aspirations. Has a good adaptation ability, being able to undertake supervision as well as subordination positions.",

      small: " In regards to their working abilities, the candidate shows a great ability to execute activities which require high concentration levels. They tend to properly follow instructions, rather than taking the initiative. Exhibits a classical analyst profile, tending to be a specialist in their field rather than a generalist. Has a high practical sense and ability to create cost and budget savings. Has a high sense of economy and practical utility, which is applicable to all kinds of situations. ",

      large : "",

      "very large" : "",

      "very small": "They are a person who can work alone, mainly in the thorough analysis of data. Low creativity.",
    },

    sizeRegularty: {
      regular: "",

      irregular: "",
    },

    signatureDistanceToText: {
      near: "",

      far: " In the work setting, this is a more analytical than executive profile. They would rather work alone and are not an expert in communicational processes. The candidate may show a certain distance between what they want and what they perceive they can reach. This person is hard to motivate.",

      correct: "",
    },

    sizeVariablity: {
      increasing:
        "",

      decreasing:
        "",

      normal: "",
    },

    speed: { 
      slow : " They are consistent in their actions, even though more slowly and quietly. The person shows high patience, as well as high tolerance and orientation towards routine-heavy jobs. ",
  
      correct : "",

      fast : "At work, they are diligent and dynamic. Their profile is ideal for positions which require movement. In this sense, the candidate is less suitable for activities that require a lot of waiting or patience, observing a low tolerance to monotony. Given their focus towards motion, their concentration and organization skills may be decreased, but their initiative is enhanced. The candidate makes an effort to achieve results in the least time possible, at times being anxious or impatient.The candidate’s profile is even more common in leadership or managerial positions.In relational terms, the candidate tends to extroversion, exhibiting ease to express emotion. They have the ability to relate to many people at once, being spontaneous and easily adapting to work teams. Their profile is adequate for positions where a good level of public relations is required.They are a person that can be influenced by their environment, being able to show emotions according to the situations faced. In this sense, their self-control ability may be decreased."
  },

    pressure: {
      over: "The person has a good level of energy and working ability, showing resistance to high work loads and pressures coming from the job. Is action-oriented and able to make decisions and express their opinions on different topics or situations. Feels confidence and security in their doing. It is estimated that the candidate has an adequate work performance level. Sometimes, given this energetic level, they may appear as a more passionate person in their work and show certain traits of aggressiveness. They are a dynamic person both in terms of thinking as well as execution. They tend to work in an accurate manner, demonstrating decisiveness and decision-making skills.",

      around: "The candidate has a good work-adaptation level. They exhibit an orientation towards a job ewll done and to view situations in a positive light, demonstrating the capacity to overcome complex or frustrating situations. The candidate shows an adequate ability for creation, idea undertaking and executive capacity. Adequate persuasion and general understanding abilities.",

      "less than": "The candidate shows decreased vitality, which makes it hard to overcome obstacles or deal with complex situations which demand more energy.",
    },

    textVariablity: {
      variable: "They tend to be guided by ethical behavior standards, being demanding of themselves and others. Along with other factors, certain rigidity may be observed in their own behavior towards themselves and others.",

      steady:
        "",
    },
  };

  return (
    <React.Fragment>
      <Overlay
        title={"Report"}
        closeOverlay={() => props.setShowResult(false)}
        cancelOverlay={() => props.setShowResult(false)}
        submitOverlay={() => null}
        wrapperClass={"mediumWrapper"}
        showActions={false}
      >
        <>
          <p />
          <table className="tableOne" cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                <td>
                  <img src="header-logo.png" alt="" />
                </td>
                <td className="heading">Reporte Grafoanálisis</td>
              </tr>
            </tbody>
          </table>
          <table className="tableTwo" cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                <td className="tableTwo_td">
                  <table>
                    <tbody>
                      <tr>
                        <td className="tableTwo_inner_td">
                          <strong>Reporte Nº:</strong> 7343472
                        </td>
                        <td className="tableTwo_inner_td">
                          <strong>Fecha:</strong> 05 - 07 - 2022
                        </td>
                        <td className="tableTwo_inner_td">
                          <strong>Cargo ID:</strong> MKT23456
                        </td>
                        <td className="tableTwo_inner_td">
                          <strong>Nombre del Cargo:</strong> Subgerente de
                          Finanzas
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="tableTwo_inner_last">
                  <strong>Página:</strong> 01
                </td>
              </tr>
            </tbody>
          </table>
          <table className="tableThree" cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                <td className="tableThree_td">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <label className="tableThree_lable">
                            Nombre del candidato:
                          </label>{" "}
                          <span className="tableThree_span">
                            {testResultData.candidateId.first_name +
                              " " +
                              testResultData.candidateId.last_name}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="tableThree_lable">Móvil:</label>{" "}
                          <span className="tableThree_span">
                            {testResultData.candidateId.phone}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="tableThree_lable">Profesión:</label>{" "}
                          <span className="tableThree_span">
                            {testResultData.candidateId.profession}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="tableThree_lable">
                            Años de experiencia:
                          </label>{" "}
                          <span className="tableThree_span">
                            {testResultData.candidateId.experience}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="tableThree_lable">
                            Nivel educacional:
                          </label>{" "}
                          <span className="tableThree_span">
                            {testResultData.candidateId.education}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="tableThree_lable">
                            Match number:
                          </label>
                          <span className="tableThree_span">96</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="tableData">
                  <img src="banner.png" alt="" className="imageOne" />{" "}
                  <span className="spanAfterImg">Match con el cargo </span>{" "}
                  <span className="spanTwoAfterImg">
                    57<label className="labelAfterImg">%</label>{" "}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="tableFour" cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                <td>
                  <table
                    className="tableFourInnerTable"
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td width="50%" className="tableFourInnerTableTd">
                          <img src="icon1.png" alt="" className="ImgTwo" />
                          <h3 className="tableFourHeader">
                            Dimensión Intelectual
                          </h3>
                          <ul className="tableFourUl">
                            {Object.keys(intellectual).map((e, idx) => {
                              // if(intellectual[e][testResultData.testResult[0][e]] != "") {                              
                                
                              //   console.log(intellectual[e][testResultData.testResult[0][e]] == "", "emotional", e)
                              //   return (
                              //     <li>
                              //   {intellectual[e][testResultData.testResult[0][e]]}
                              // </li>
                              // )}
                              if(intellectual[e][testResultData.testResult[0][e]]){ 
                              return (
                                <li key={"intellectual - " + idx}>
                              {intellectual[e][testResultData.testResult[0][e]]}
                            </li>
                            )
                            }
                            })}
                          </ul>
                        </td>
                        <td width="50%">
                          <table className="tableFive">
                            <tbody>
                              <tr>
                                <td>
                                  <span className="tableFiveSpan">
                                    Destacado
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="tableFour" cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                <td>
                  <table
                    className="tableFourInnerTable"
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td width="50%" className="tableFourInnerTableTd">
                          <img src="icon2.png" alt="" className="ImgTwo" />
                          <h3 className="tableFourHeader">
                            Dimensión Afectiva
                          </h3>
                          <ul className="tableFourUl">
                          {Object.keys(emotional).map((e, idx) => {
                              if(emotional[e][testResultData.testResult[0][e]]) {                              
                                
                                // console.log(emotional[e][testResultData.testResult[0][e]] == "", "emotional", e)
                                return (
                                  <li key={"emotional -" + idx} >
                                {emotional[e][testResultData.testResult[0][e]]}
                              </li>
                              )
                            }
                            })}
                          </ul>
                        </td>
                        <td width="50%">
                          <table className="tableFive">
                            <tbody>
                              <tr>
                                <td>
                                  <span className="tableFiveSpan">
                                    Destacado
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="tableFour" cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                <td>
                  <table
                    className="tableFourInnerTable"
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td width="50%" className="tableFourInnerTableTd">
                          <img src="icon1.png" alt="" className="ImgTwo" />
                          <h3 className="tableFourHeader">
                            Dimensión Intelectual
                          </h3>
                          <ul className="tableFourUl">
                          {Object.keys(relational).map((e, idx) => {
                              if(relational[e][testResultData.testResult[0][e]]) {                              
                                
                                // console.log(relational[e][testResultData.testResult[0][e]] == "", "emotional", e)
                                return (
                                  <li key={"relational -" + idx} >
                                {relational[e][testResultData.testResult[0][e]]}
                              </li>
                              )
                            }
                            })}
                          </ul>
                        </td>
                        <td width="50%">
                          <table className="tableFive">
                            <tbody>
                              <tr>
                                <td>
                                  <span className="tableFiveSpan">
                                    Destacado
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="tableFour" cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                <td>
                  <table
                    className="tableFourInnerTable"
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td width="50%" className="tableFourInnerTableTd">
                          <img src="icon1.png" alt="" className="ImgTwo" />
                          <h3 className="tableFourHeader">
                            Dimensión Intelectual
                          </h3>
                          <ul className="tableFourUl">
                          {Object.keys(work).map((e, idx) => {
                              if(work[e][testResultData.testResult[0][e]]) {                              
                                
                                // console.log(work[e][testResultData.testResult[0][e]] == "", "emotional", e)
                                return (
                                  <li key={"work -" + idx} >
                                {work[e][testResultData.testResult[0][e]]}
                              </li>
                              )
                            }
                            })}
                          </ul>
                        </td>
                        <td width="50%">
                          <table className="tableFive">
                            <tbody>
                              <tr>
                                <td>
                                  <span className="tableFiveSpan">
                                    Destacado
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="tableSix" cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                <td className="tableSixTd">
                  <img src="footer-logo.png" alt="" />
                </td>
                <td className="tdLink">contacto@recruitersai.com</td>
                <td className="tdLink">https://www.recruitersai.com</td>
                <td className="tableSixLastTd">Chile</td>
              </tr>
            </tbody>
          </table>
        </>
      </Overlay>
    </React.Fragment>
  );
};

export default ResultOverlay;
