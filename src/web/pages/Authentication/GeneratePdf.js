import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text } from "../../../context/provider";
import SpanishTranslation from "../../../locales/es.json";
import EnglishTranslation from "../../../locales/en.json";
import { useStoreActions, useStoreState } from "easy-peasy";

import "./pdf.scss";
import { transform } from "lodash";

function GeneratePdf(props) {
  const { id, lang } = useParams();

  const [testResultData, setTestResultData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [candidateData, setCandidateData] = useState();
  const pdfData = useStoreState((state) => state.admin.pdfData);
  const [cancelImage, setCancelImage] = useState(false);
  const getPdfDetails = useStoreActions(
    (actions) => actions.admin.getPdfDetails
  );

  // useEffect(() => {
  //   setCancelImage(false)
  // }, [cancelImage] )

  var finalTranslation = "";
  if (lang == "es") {
    finalTranslation = SpanishTranslation;
  } else {
    finalTranslation = EnglishTranslation;
  }

  const intellectual = {
    black_pixel_percentage: {
      white_domain:
        finalTranslation.intellectual.black_pixel_percentage.white_domain,

      black_domain:
        finalTranslation.intellectual.black_pixel_percentage.black_domain,
    },

    legibility: {
      legible: finalTranslation.intellectual.legibility.legible,
      illegible: finalTranslation.intellectual.legibility.illegible,
    },

    letter_tilt: {
      moderately_inverted:
        finalTranslation.intellectual.letter_tilt.moderately_inverted,

      inverted_regressive:
        finalTranslation.intellectual.letter_tilt.inverted_regressive,

      inclined_progressive:
        finalTranslation.intellectual.letter_tilt.inclined_progressive,

      straight: finalTranslation.intellectual.letter_tilt.straight,

      moderately_inclined:
        finalTranslation.intellectual.letter_tilt.moderately_inclined,

      // inclined: finalTranslation.intellectual.letter_tilt,

      // laid: finalTranslation.intellectual.letter_tilt,
    },

    line_slope: {
      very_ascending_lines:
        finalTranslation.intellectual.line_slope.very_ascending_lines,

      ascending_lines: finalTranslation.intellectual.line_slope.ascending_lines,

      horizontal_lines:
        finalTranslation.intellectual.line_slope.horizontal_lines,

      descending_lines:
        finalTranslation.intellectual.line_slope.descending_lines,

      very_descending_lines:
        finalTranslation.intellectual.line_slope.very_descending_lines,
    },

    pressure: {
      correct_pressure: finalTranslation.intellectual.pressure.correct_pressure,

      strong_pressure: finalTranslation.intellectual.pressure.strong_pressure,

      soft_pressure: finalTranslation.intellectual.pressure.soft_pressure,
    },

    proportionality_ratio: {
      correct_proportion:
        finalTranslation.intellectual.proportionality_ratio.correct_proportion,

      wider_proportion:
        finalTranslation.intellectual.proportionality_ratio.wider_proportion,

      tall_proportion:
        finalTranslation.intellectual.proportionality_ratio.tall_proportion,
    },

    shape: {
      straight_angled: finalTranslation.intellectual.shape.straight_angled,

      curved: finalTranslation.intellectual.shape.curved,
    },

    seperation_between_the_letters: {
      short_separation_between_letters:
        finalTranslation.intellectual.seperation_between_the_letters
          .short_separation_between_letters,

      correct_separation_between_letters:
        finalTranslation.intellectual.seperation_between_the_letters
          .correct_separation_between_letters,

      long_separation_between_letters:
        finalTranslation.intellectual.seperation_between_the_letters
          .long_separation_between_letters,
    },

    seperation_between_the_words: {
      short_separation_between_words:
        finalTranslation.intellectual.seperation_between_the_words
          .short_separation_between_words,

      correct_separation_between_words:
        finalTranslation.intellectual.seperation_between_the_words
          .correct_separation_between_words,

      long_separation_between_words:
        finalTranslation.intellectual.seperation_between_the_words
          .long_separation_between_words,
    },
    // signature: {
    //   far: finalTranslation.intellectual.signature.far,

    //   near: finalTranslation.intellectual.signature.near,

    //   correct: finalTranslation.intellectual.signature.correct,
    // },

    // signature_legibility: {
    //   legible: finalTranslation.intellectual.signature_legibility.legible,
    //   illegible: finalTranslation.intellectual.signature_legibility.illegible,
    // },

    signature_position: {
      left: finalTranslation.intellectual.signature_position.left,

      center: finalTranslation.intellectual.signature_position.center,

      right: finalTranslation.intellectual.signature_position.right,
    },

    size: {
      correct_size: finalTranslation.intellectual.size.correct_size,
      small_size: finalTranslation.intellectual.size.small_size,

      large_size: finalTranslation.intellectual.size.large_size,

      very_large_size: finalTranslation.intellectual.size.very_large_size,

      very_small_size: finalTranslation.intellectual.size.very_small_size,
    },

    size_regularity: {
      regular: finalTranslation.intellectual.size_regularity.regular,

      irregular: finalTranslation.intellectual.size_regularity.irregular,
    },

    signature_distance_to_text: {
      near_distance:
        finalTranslation.intellectual.signature_distance_to_text.near_distance,

      far_distance:
        finalTranslation.intellectual.signature_distance_to_text.far_distance,

      correct_distance:
        finalTranslation.intellectual.signature_distance_to_text
          .correct_distance,
    },

    size_variability: {
      increasing: finalTranslation.intellectual.size_variability.increasing,

      decreasing: finalTranslation.intellectual.size_variability.decreasing,

      no_phenomenon:
        finalTranslation.intellectual.size_variability.no_phenomenon,
    },

    speed: {
      slow_speed: finalTranslation.intellectual.speed.slow_speed,

      correct_speed: finalTranslation.intellectual.speed.correct_speed,

      fast_speed: finalTranslation.intellectual.speed.fast_speed,
    },

    text_stability: {
      irregular_handwriting:
        finalTranslation.intellectual.text_stability.irregular_handwriting,

      regular_handwriting:
        finalTranslation.intellectual.text_stability.regular_handwriting,
    },
  };

  const emotional = {
    black_pixel_percentage: {
      white_domain_domain:
        finalTranslation.emotional.black_pixel_percentage.white_domain_domain,

      black_domain:
        finalTranslation.emotional.black_pixel_percentage.black_domain,
    },

    legibility: {
      legible: finalTranslation.emotional.legibility.legible,

      illegible: finalTranslation.emotional.legibility.illegible,
    },

    shape: {
      straight_angled: finalTranslation.emotional.shape.straight_angled,

      curved: finalTranslation.emotional.shape.curved,
    },

    letter_tilt: {
      moderately_inverted:
        finalTranslation.emotional.letter_tilt.moderately_inverted,

      inverted_regressive:
        finalTranslation.emotional.letter_tilt.inverted_regressive,

      inclined_progressive:
        finalTranslation.emotional.letter_tilt.inclined_progressive,

      straight: finalTranslation.emotional.letter_tilt.straight,

      moderately_inclined: finalTranslation.emotional.moderately_inclined,

      // inclined: finalTranslation.emotional.letter_tilt,

      // laid: finalTranslation.emotional.letter_tilt,
    },

    line_slope: {
      very_ascending_lines:
        finalTranslation.emotional.line_slope.very_ascending_lines,

      ascending_lines: finalTranslation.emotional.line_slope.ascending_lines,

      horizontal_lines: finalTranslation.emotional.line_slope.horizontal_lines,

      descending_lines: finalTranslation.emotional.line_slope.descending_lines,

      very_descending_lines:
        finalTranslation.emotional.line_slope.very_descending_lines,
    },

    pressure: {
      correct_pressure: finalTranslation.emotional.pressure.correct_pressure,

      strong_pressure: finalTranslation.emotional.pressure.strong_pressure,

      soft_pressure: finalTranslation.emotional.pressure.soft_pressure,
    },

    proportionality_ratio: {
      correct_proportion:
        finalTranslation.emotional.proportionality_ratio.correct_proportion,

      wider_proportion:
        finalTranslation.emotional.proportionality_ratio.wider_proportion,

      tall_proportion:
        finalTranslation.emotional.proportionality_ratio.tall_proportion,
    },

    seperation_between_the_letters: {
      short_separation_between_letters:
        finalTranslation.emotional.seperation_between_the_letters
          .short_separation_between_letters,

      correct_separation_between_letters:
        finalTranslation.emotional.seperation_between_the_letters
          .correct_separation_between_letters,

      long_separation_between_letters:
        finalTranslation.emotional.seperation_between_the_letters
          .long_separation_between_letters,
    },

    seperation_between_the_words: {
      short_separation_between_words:
        finalTranslation.emotional.seperation_between_the_words
          .short_separation_between_words,

      correct_separation_between_words:
        finalTranslation.emotional.seperation_between_the_words
          .correct_separation_between_words,

      long_separation_between_words:
        finalTranslation.emotional.seperation_between_the_words
          .long_separation_between_words,
    },
    // signature: {
    //   far: finalTranslation.emotional.signature.far,

    //   near: finalTranslation.emotional.signature.near,

    //   correct: finalTranslation.emotional.signature.correct,
    // },

    signatureLegibility: {
      legible: finalTranslation.emotional.black_pixel_percentage.legible,
      illegible: finalTranslation.emotional.black_pixel_percentage.illegible,
    },

    signature_position: {
      left: finalTranslation.emotional.signature_position.left,

      center: finalTranslation.emotional.signature_position.center,

      right: finalTranslation.emotional.signature_position.right,
    },

    size: {
      correct_size: finalTranslation.emotional.size.correct_size,
      small_size: finalTranslation.emotional.size.small_size,

      large_size: finalTranslation.emotional.size.large_size,

      very_large_size: finalTranslation.emotional.size.very_large_size,

      very_small_size: finalTranslation.emotional.size.very_small_size,
    },

    size_regularity: {
      regular: finalTranslation.emotional.size_regularity.regular,

      irregular: finalTranslation.emotional.size_regularity.irregular,
    },

    signature_distance_to_text: {
      near_distance:
        finalTranslation.emotional.signature_distance_to_text.near_distance,

      far_distance:
        finalTranslation.emotional.signature_distance_to_text.far_distance,

      correct_distance:
        finalTranslation.emotional.signature_distance_to_text.correct_distance,
    },

    size_variability: {
      increasing: finalTranslation.emotional.size_variability.increasing,

      decreasing: finalTranslation.emotional.size_variability.decreasing,

      no_phenomenon: finalTranslation.emotional.size_variability.no_phenomenon,
    },

    speed: {
      slow_speed: finalTranslation.emotional.speed.slow_speed,

      correct_speed: finalTranslation.emotional.speed.correct_speed,

      fast_speed: finalTranslation.emotional.speed.fast_speed,
    },

    text_stability: {
      irregular_handwriting:
        finalTranslation.emotional.text_stability.irregular_handwriting,

      regular_handwriting:
        finalTranslation.emotional.text_stability.regular_handwriting,
    },
  };

  const relational = {
    black_pixel_percentage: {
      white_domain_domain:
        finalTranslation.relational.black_pixel_percentage.white_domain_domain,

      black_domain:
        finalTranslation.relational.black_pixel_percentage.black_domain,
    },

    legibility: {
      legible: finalTranslation.relational.legibility.legible,

      illegible: finalTranslation.relational.legibility.illegible,
    },

    letter_tilt: {
      moderately_inverted:
        finalTranslation.relational.letter_tilt.moderately_inverted,

      inverted_regressive:
        finalTranslation.relational.letter_tilt.inverted_regressive,

      inclined_progressive:
        finalTranslation.relational.letter_tilt.inclined_progressive,

      straight: finalTranslation.relational.letter_tilt.straight,

      moderately_inclined:
        finalTranslation.relational.letter_tilt.moderately_inclined,

      // inclined: finalTranslation.relational.letter_tilt,

      // laid: finalTranslation.relational.letter_tilt,
    },

    shape: {
      straight_angled: finalTranslation.relational.shape.straight_angled,

      curved: finalTranslation.relational.shape.curved,
    },

    line_slope: {
      very_ascending_lines:
        finalTranslation.relational.line_slope.very_ascending_lines,

      ascending_lines: finalTranslation.relational.line_slope.ascending_lines,

      horizontal_lines: finalTranslation.relational.line_slope.horizontal_lines,

      descending_lines: finalTranslation.relational.line_slope.descending_lines,

      very_descending_lines:
        finalTranslation.relational.line_slope.very_descending_lines,
    },

    pressure: {
      correct_pressure: finalTranslation.relational.pressure.correct_pressure,

      strong_pressure: finalTranslation.relational.pressure.strong_pressure,

      soft_pressure: finalTranslation.relational.pressure.soft_pressure,
    },

    proportionality_ratio: {
      correct_proportion:
        finalTranslation.relational.proportionality_ratio.correct_proportion,

      wider_proportion:
        finalTranslation.relational.proportionality_ratio.wider_proportion,

      tall_proportion:
        finalTranslation.relational.proportionality_ratio.tall_proportion,
    },

    seperation_between_the_letters: {
      short_separation_between_letters:
        finalTranslation.relational.seperation_between_the_letters
          .short_separation_between_letters,

      correct_separation_between_letters:
        finalTranslation.relational.seperation_between_the_letters
          .correct_separation_between_letters,

      long_separation_between_letters:
        finalTranslation.relational.seperation_between_the_letters
          .long_separation_between_letters,
    },

    seperation_between_the_words: {
      short_separation_between_words:
        finalTranslation.relational.seperation_between_the_words
          .short_separation_between_words,

      correct_separation_between_words:
        finalTranslation.relational.seperation_between_the_words
          .correct_separation_between_words,

      long_separation_between_words:
        finalTranslation.relational.seperation_between_the_words
          .long_separation_between_words,
    },
    // signature: {
    //   far: finalTranslation.relational.signature.far,

    //   near: finalTranslation.relational.signature.near,

    //   correct: finalTranslation.relational.signature.correct,
    // },

    // signature_legibility: {
    //   legible: finalTranslation.relational.signature_legibility.legible,
    //   illegible: finalTranslation.relational.signature_legibility.illegible,
    // },

    signature_position: {
      left: finalTranslation.relational.signature_position.left,

      center: finalTranslation.relational.signature_position.center,

      right: finalTranslation.relational.signature_position.right,
    },

    size: {
      correct_size: finalTranslation.relational.size.correct_size,
      small_size: finalTranslation.relational.size.small_size,

      large_size: finalTranslation.relational.size.large_size,

      very_large_size: finalTranslation.relational.size.very_large_size,

      very_small_size: finalTranslation.relational.size.very_small_size,
    },

    size_regularity: {
      regular: finalTranslation.relational.size_regularity.regular,

      irregular: finalTranslation.relational.size_regularity.irregular,
    },

    signature_distance_to_text: {
      near_distance:
        finalTranslation.relational.signature_distance_to_text.near_distance,

      far_distance:
        finalTranslation.relational.signature_distance_to_text.far_distance,

      correct_distance:
        finalTranslation.relational.signature_distance_to_text.correct_distance,
    },

    size_variability: {
      increasing: finalTranslation.relational.size_variability.increasing,

      decreasing: finalTranslation.relational.size_variability.decreasing,

      no_phenomenon: finalTranslation.relational.size_variability.no_phenomenon,
    },

    speed: {
      slow_speed: finalTranslation.relational.speed.slow_speed,

      correct_speed: finalTranslation.relational.speed.correct_speed,

      fast_speed: finalTranslation.relational.speed.fast_speed,
    },

    text_stability: {
      irregular_handwriting:
        finalTranslation.relational.text_stability.irregular_handwriting,

      regular_handwriting:
        finalTranslation.relational.text_stability.regular_handwriting,
    },
  };

  const work = {
    black_pixel_percentage: {
      white_domain: finalTranslation.work.black_pixel_percentage.white_domain,

      black_domain: finalTranslation.work.black_pixel_percentage.black_domain,
    },

    shape: {
      straight_angled: finalTranslation.work.shape.straight_angled,

      curved: finalTranslation.work.shape.curved,
    },

    legibility: {
      legible: finalTranslation.work.legibility.legible,

      illegible: finalTranslation.work.legibility.illegible,
    },

    letter_tilt: {
      moderately_inverted:
        finalTranslation.work.letter_tilt.moderately_inverted,

      inverted_regressive:
        finalTranslation.work.letter_tilt.inverted_regressive,

      inclined_progressive:
        finalTranslation.work.letter_tilt.inclined_progressive,

      straight: finalTranslation.work.letter_tilt.straight,

      moderately_inclined:
        finalTranslation.work.letter_tilt.moderately_inclined,

      // inclined: finalTranslation.work.letter_tilt,

      // laid: finalTranslation.work.letter_tilt,
    },

    line_slope: {
      very_ascending_lines:
        finalTranslation.work.line_slope.very_ascending_lines,

      ascending_lines: finalTranslation.work.line_slope.ascending_lines,

      horizontal_lines: finalTranslation.work.line_slope.horizontal_lines,

      descending_lines: finalTranslation.work.line_slope.descending_lines,

      very_descending_lines:
        finalTranslation.work.line_slope.very_descending_lines,
    },

    proportionality_ratio: {
      correct_proportion:
        finalTranslation.work.proportionality_ratio.correct_proportion,

      wider_proportion:
        finalTranslation.work.proportionality_ratio.wider_proportion,

      tall_proportion:
        finalTranslation.work.proportionality_ratio.tall_proportion,
    },

    seperation_between_the_letters: {
      short_separation_between_letters:
        finalTranslation.work.seperation_between_the_letters
          .short_separation_between_letters,

      correct_separation_between_letters:
        finalTranslation.work.seperation_between_the_letters
          .correct_separation_between_letters,

      long_separation_between_letters:
        finalTranslation.work.seperation_between_the_letters
          .long_separation_between_letters,
    },

    seperation_between_the_words: {
      short_separation_between_words:
        finalTranslation.work.seperation_between_the_words
          .short_separation_between_words,

      correct_separation_between_words:
        finalTranslation.work.seperation_between_the_words
          .correct_separation_between_words,

      long_separation_between_words:
        finalTranslation.work.seperation_between_the_words
          .long_separation_between_words,
    },
    // signature: {
    //   far: finalTranslation.work.signature.far,

    //   near: finalTranslation.work.signature.near,

    //   correct: finalTranslation.work.signature.correct,
    // },

    // signature_legibility: {
    //   legible: finalTranslation.work.signature_legibility.legible,
    //   illegible: finalTranslation.work.signature_legibility.illegible,
    // },

    signature_position: {
      left: finalTranslation.work.signature_position.left,

      center: finalTranslation.work.signature_position.center,

      right: finalTranslation.work.signature_position.right,
    },

    size: {
      correct_size: finalTranslation.work.size.correct_size,
      small_size: finalTranslation.work.size.small_size,

      large_size: finalTranslation.work.size.large_size,

      very_large_size: finalTranslation.work.size.very_large_size,

      very_small_size: finalTranslation.work.size.very_small_size,
    },

    size_regularity: {
      regular: finalTranslation.work.size_regularity.regular,

      irregular: finalTranslation.work.size_regularity.irregular,
    },

    signature_distance_to_text: {
      near_distance:
        finalTranslation.work.signature_distance_to_text.near_distance,

      far_distance:
        finalTranslation.work.signature_distance_to_text.far_distance,

      correct_distance:
        finalTranslation.work.signature_distance_to_text.correct_distance,
    },

    size_variability: {
      increasing: finalTranslation.work.size_variability.increasing,

      decreasing: finalTranslation.work.size_variability.decreasing,

      no_phenomenon: finalTranslation.work.size_variability.no_phenomenon,
    },

    speed: {
      slow_speed: finalTranslation.work.speed.slow_speed,

      correct_speed: finalTranslation.work.speed.correct_speed,

      fast_speed: finalTranslation.work.speed.fast_speed,
    },

    pressure: {
      correct_pressure: finalTranslation.work.pressure.correct_pressure,

      strong_pressure: finalTranslation.work.pressure.strong_pressure,

      soft_pressure: finalTranslation.work.pressure.soft_pressure,
    },

    text_stability: {
      irregular_handwriting:
        finalTranslation.work.text_stability.irregular_handwriting,

      regular_handwriting:
        finalTranslation.work.text_stability.regular_handwriting,
    },
  };

  useEffect(() => {
    if ((id, lang)) {
      const getDetailsForPdf = async (id, lang) => {
        getPdfDetails({ id, lang });
      };
      getDetailsForPdf(id, lang);
      setCancelImage(true);
    }
  }, [id, lang]);

  useEffect(() => {
    if (pdfData) {
      setCandidateData();
      setTestResultData(pdfData.testResult);
      setSkillData(pdfData?.name?.jobId?.skills);
    }
  }, [pdfData]);

  console.log(skillData, "SIKILL");

  Object.keys(intellectual).map((e, idx) => {
    if (intellectual[e][testResultData[e]]) {
      let interObj = intellectual[e][testResultData[e]]?.find(
        (e) => e.highlight != "0"
      );
      let interpretation = interObj
        ? interObj.interpretation
        : intellectual[e][testResultData[e]][0].interpretation;
    }
  });

  let successImageToShow = false;

  let tableCheck = [];

  skillData.map((e) => {
    let valueAdded = false;
    Object.keys(relational).map((val, idx) => {

      relational[val][testResultData[val]]?.map((intel) => {
        if (e.name === intel.skill && e.value === intel.value) {
          console.log(
            e.name, intel.skill, e.value, intel.value,
            intel,
            "<--- RELATIONAL VALUE"
          )
          // console.log(intel, "<---- RELATIONAL VALUE")
          // console.log(e.name, e.value, '<----- NAME', '<-------Value')
          // console.log(intel.skill, intel.value, '<----- INTEL NAME', '<------- INTEL Value')
          if(!valueAdded){
            valueAdded = true;
            tableCheck.push(1);
          }
        }
      });
    });

    Object.keys(intellectual).map((val, idx) => {
     
      intellectual[val][testResultData[val]]?.map((intel) => {
        if (e.name === intel.skill && e.value === intel.value) {
          console.log(
            e.name, intel.skill, e.value, intel.value,
            intel,
            "<--- INTELLECTUAL VALUE"
          );
          // console.log(intel, "<---- RELATIONAL VALUE")
          // console.log(e.name, e.value, '<----- NAME', '<-------Value')
          // console.log(intel.skill, intel.value, '<----- INTEL NAME', '<------- INTEL Value')
          if(!valueAdded){
            valueAdded = true;
            tableCheck.push(1);
          }
                }
      });
    });

    Object.keys(emotional).map((val, idx) => {
     
      emotional[val][testResultData[val]]?.map((intel) => {
        if (e.name === intel.skill && e.value === intel.value) {
          console.log(
            e.name, intel.skill, e.value, intel.value,
            intel,
            "<--- EMOTIONAL VALUE"
          )
          // console.log(e.name === intel.skill &&
          //   e.value === intel.value, intel, "<---- RELATIONAL VALUE")              // console.log(e.name, e.value, '<----- NAME', '<-------Value')
          // console.log(intel.skill, intel.value, '<----- INTEL NAME', '<------- INTEL Value')
          if(!valueAdded){
            valueAdded = true;
            tableCheck.push(1);
          } 
        }
      });
    });

    Object.keys(work).map((val, idx) => {

      // console.log(e, '<---- EEE', val, '<----VALUE')
      // console.log(intellectual[e][testResultData[e]], "FGHUJIKOL")
      work[val][testResultData[val]]?.map((intel) => {
        if (e.name === intel.skill && e.value === intel.value) {
          console.log(
            e.name, intel.skill, e.value, intel.value,
            intel,
            "<--- WORK VALUE"
          )
          // console.log(e.name === intel.skill &&
          //   e.value === intel.value, intel, "<---- RELATIONAL VALUE")
          // console.log(e.name, e.value, '<----- NAME', '<-------Value')
          // console.log(intel.skill, intel.value, '<----- INTEL NAME', '<------- INTEL Value')
          if(!valueAdded){
            valueAdded = true;
            tableCheck.push(1);
          }
        }
      });
    });
  });
  console.log(tableCheck, "TABLE CHECk");

  let totalRows = skillData.length;
  let selectedValues = tableCheck.length;

  console.log(selectedValues, "SELECTED");

  // let finalPercentage = 100/(e*totalRows)
  let value = (selectedValues / totalRows)*100
  let final = Math.round(value);
  console.log(final, "FINALLLLLLL");

  return (
    <React.Fragment>
      <>
        <table
          className="main-background GeneratePdf"
          width={1600}
          cellSpacing={0}
          cellPadding={0}
        >
          <tbody>
            <tr>
              <td>
                <table className="firstTable" cellSpacing={0} cellPadding={0}>
                  <tbody>
                    <tr>
                      <td valign="bottom">
                        <img src="/images/header-logo.png" height={71} />
                      </td>
                      <td
                        valign="center"
                        style={{
                          fontSize: "31px",
                          color: "#ffffff",
                          fontWeight: 500,
                          lineHeight: "45px",
                          fontFamily: '"Jost", arial',
                          textAlign: "right",
                        }}
                      >
                        {finalTranslation.report_text_report_down}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table className="secondTable " cellSpacing={0} cellPadding={0}>
                  <tbody>
                    <tr>
                      <td
                        valign="center"
                        style={{
                          fontSize: "21px",
                          color: "#3E3470",
                          fontWeight: 400,
                          lineHeight: "77px",
                          fontFamily: '"Jost", arial',
                        }}
                      >
                        <table>
                          <tbody>
                            <tr>
                              <td style={{ paddingRight: "21px" }}>
                                <b> {finalTranslation.report_text_report} </b>{" "}
                                7343472
                              </td>
                              <td style={{ paddingRight: "21px" }}>
                                <b>{finalTranslation.date_text_report}</b> 05 -
                                07 - 2022
                              </td>
                              <td style={{ paddingRight: "21px" }}>
                                <b>{finalTranslation.charge_text_report}</b>{" "}
                                MKT23456
                              </td>
                              <td style={{ paddingRight: "21px" }}>
                                <b>{finalTranslation.job_title_report}</b>{" "}
                                {pdfData?.name.jobId.name}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td
                        valign="center"
                        style={{
                          fontSize: "21px",
                          color: "#3E3470",
                          fontWeight: 400,
                          lineHeight: "77px",
                          fontFamily: '"Jost", arial',
                          textAlign: "right",
                        }}
                      >
                        <b>{finalTranslation.page_text_report}</b> 01
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table className="thirdTable" cellSpacing={0} cellPadding={0}>
                  <tbody>
                    <tr>
                      <td
                        width="50%"
                        valign="top"
                        style={{
                          width: "50%",
                          paddingTop: "34px",
                          paddingBottom: "34px",
                          borderBottom: "1px solid #948BC0",
                          lineHeight: "45px",
                        }}
                      >
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <label
                                  style={{
                                    color: "#91C6C8",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                  }}
                                >
                                  {finalTranslation.candidate_text_report}
                                </label>
                                <span
                                  style={{
                                    color: "#ffffff",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {pdfData?.name.candidateId.first_name +
                                    " " +
                                    pdfData?.name.candidateId.last_name}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label
                                  style={{
                                    color: "#91C6C8",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                  }}
                                >
                                  {finalTranslation.mobile_text_report}
                                </label>
                                <span
                                  style={{
                                    color: "#ffffff",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {pdfData?.name.candidateId.phone}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label
                                  style={{
                                    color: "#91C6C8",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                  }}
                                >
                                  {finalTranslation.profession_text_report}
                                </label>
                                <span
                                  style={{
                                    color: "#ffffff",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {pdfData?.name.candidateId.profession}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label
                                  style={{
                                    color: "#91C6C8",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                  }}
                                >
                                  {finalTranslation.experience_text_report}
                                </label>
                                <span
                                  style={{
                                    color: "#ffffff",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {pdfData?.name.candidateId.experience}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label
                                  style={{
                                    color: "#91C6C8",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                  }}
                                >
                                  {finalTranslation.education_text_report}
                                </label>
                                <span
                                  style={{
                                    color: "#ffffff",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {pdfData?.name.jobId.education}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label
                                  style={{
                                    color: "#91C6C8",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                  }}
                                >
                                  {finalTranslation.number_text_report}
                                </label>
                                <span
                                  style={{
                                    color: "#ffffff",
                                    fontSize: "31px",
                                    lineHeight: "45px",
                                    fontWeight: 600,
                                  }}
                                >
                                  96
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td
                        width="50%"
                        valign="center"
                        style={{
                          width: "50%",
                          fontSize: "31px",
                          color: "#ffffff",
                          fontWeight: 500,
                          lineHeight: "45px",
                          fontFamily: '"Jost", arial',
                          textAlign: "right",
                          borderBottom: "1px solid #948BC0",
                        }}
                      >
                        <img
                          src="/images/banner.png"
                          style={{ float: "right", border: "none" }}
                          height={399}
                        />
                        <span
                          style={{
                            fontSize: "31px",
                            color: "#ffffff",
                            fontWeight: 600,
                            textAlign: "center",
                            width: "167px",
                            float: "right",
                            marginRight: "-196px",
                            marginTop: "151px",
                            lineHeight: "29px",
                            fontStyle: "italic",
                          }}
                        >
                          {finalTranslation.position_text_report}
                        </span>
                        <span
                          style={{
                            fontSize: "79px",
                            color: "#ffffff",
                            fontWeight: 700,
                            marginRight: "-457px",
                            marginTop: "156px",
                            float: "right",
                          }}
                        >
                          {final}
                          <label
                            style={{
                              fontSize: "39px",
                              color: "#ffffff",
                              fontWeight: 700,
                            }}
                          >
                            %
                          </label>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table className="fourthTable" cellSpacing={0} cellPadding={0}>
                  <tbody>
                    <tr>
                      <td>
                        <table
                          className="fourthInnerTable"
                          cellSpacing={0}
                          cellPadding={0}
                        >
                          <tbody>
                            <tr>
                              <td
                                width="50%"
                                style={{
                                  width: "50%",
                                  paddingRight: "0px",
                                }}
                                valign="top"
                              >
                                <div className="div-one">
                                  <img
                                    src="/images/iconBulb.png"
                                    style={{
                                      float: "left",
                                      padding: "6px 62px 14px 0",
                                    }}
                                  />
                                  <h3
                                    style={{
                                      color: "#5B5BA1",
                                      fontSize: "40px",
                                      lineHeight: "69px",
                                      fontWeight: 500,
                                      fontStyle: "italic",
                                      padding: "28px 0px 43px",
                                      margin: "0px",
                                    }}
                                  >
                                    {finalTranslation.intellectual_text_report}
                                  </h3>
                                </div>
                                <ul
                                  style={{
                                    color: "#01979C",
                                    fontSize: "19px",
                                    lineHeight: "38px",
                                    paddingLeft: "82px",
                                    margin: "0px",
                                    paddingTop: "0px",
                                  }}
                                >
                                  {testResultData &&
                                    Object.keys(intellectual).map((e, idx) => {
                                      if (intellectual[e][testResultData[e]]) {
                                        let interObj = intellectual[e][
                                          testResultData[e]
                                        ].find((e) => e.highlight != "0");

                                        console.log(interObj, "INTER OBJ");

                                        let interpretation = interObj
                                          ? interObj.interpretation
                                          : intellectual[e][
                                              testResultData[e]
                                            ][0].interpretation;
                                        const zeroValues =
                                          interpretation === "0";

                                        if (zeroValues) return;

                                        return (
                                          <li key={"work - " + idx}>
                                            {interpretation}
                                          </li>
                                        );
                                      }
                                    })}
                                </ul>
                              </td>
                              <td
                                width="50%"
                                style={{ width: "50%" }}
                                valign="top"
                              >
                                <table className="fourthInnerRight pdf-table">
                                  <tbody>
                                    <tr>
                                      {/* <td valign="top"> */}

                                      <span
                                        style={{
                                          color: "#5B5BA1",
                                          background: "#ffffff",
                                          fontSize: "37px",
                                          lineHeight: "53px",
                                          fontWeight: 500,
                                          marginTop: "-97px",
                                          float: "left",
                                          marginLeft: "70px",
                                        }}
                                      >
                                        {finalTranslation.outstanding_heading}
                                      </span>
                                      {/* </td> */}

                                      <ul
                                        style={{
                                          color: "#01979C",
                                          fontSize: "19px",
                                          lineHeight: "38px",
                                          paddingLeft: "32px",
                                          margin: "0px",
                                          paddingTop: "0px",
                                        }}
                                      >
                                        {testResultData &&
                                          Object.keys(intellectual).map(
                                            (e, idx) => {
                                              if (
                                                intellectual[e][
                                                  testResultData[e]
                                                ]
                                              ) {
                                                let highlightValues =
                                                  intellectual[e][
                                                    testResultData[e]
                                                  ].find((e) => e.highlight);

                                                const finalValue =
                                                  highlightValues?.highlight;

                                                if (finalValue) {
                                                  if (finalValue === "0")
                                                    return;

                                                  return <li>{finalValue}</li>;
                                                }
                                              }
                                            }
                                          )}
                                      </ul>
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
              </td>
            </tr>
            <tr>
              <td>
                <table className="fourthTable" cellSpacing={0} cellPadding={0}>
                  <tbody>
                    <tr>
                      <td>
                        <table
                          className="fourthInnerTable"
                          cellSpacing={0}
                          cellPadding={0}
                        >
                          <tbody>
                            <tr>
                              <td
                                width="50%"
                                style={{
                                  width: "50%",
                                  paddingRight: "0px",
                                }}
                                valign="top"
                              >
                                <div className="div-one">
                                  <img
                                    src="/images/icon2.png"
                                    style={{
                                      float: "left",
                                      padding: "6px 62px 14px 0",
                                    }}
                                  />
                                  <h3
                                    style={{
                                      color: "#5B5BA1",
                                      fontSize: "40px",
                                      lineHeight: "69px",
                                      fontWeight: 500,
                                      fontStyle: "italic",
                                      padding: "28px 0px 43px",
                                      margin: "0px",
                                    }}
                                  >
                                    {finalTranslation.affective_heading}
                                  </h3>
                                </div>
                                <ul
                                  style={{
                                    color: "#01979C",
                                    fontSize: "19px",
                                    lineHeight: "38px",
                                    paddingLeft: "82px",
                                    margin: "0px",
                                    paddingTop: "0px",
                                  }}
                                >
                                  {testResultData &&
                                    Object.keys(emotional).map((e, idx) => {
                                      if (emotional[e][testResultData[e]]) {
                                        let interObj = emotional[e][
                                          testResultData[e]
                                        ].find((e) => e.highlight != "0");

                                        let interpretation = interObj
                                          ? interObj.interpretation
                                          : emotional[e][testResultData[e]][0]
                                              .interpretation;
                                        const zeroValues =
                                          interpretation === "0";

                                        if (zeroValues) return;

                                        return (
                                          <li key={"work - " + idx}>
                                            {interpretation}
                                          </li>
                                        );
                                      }
                                    })}
                                </ul>
                              </td>
                              <td
                                width="50%"
                                style={{ width: "50%" }}
                                valign="top"
                              >
                                <table className="fourthInnerRight pdf-table">
                                  <tbody>
                                    <tr>
                                      {/* <td valign="top"> */}

                                      <span
                                        style={{
                                          color: "#5B5BA1",
                                          background: "#ffffff",
                                          fontSize: "37px",
                                          lineHeight: "53px",
                                          fontWeight: 500,
                                          marginTop: "-97px",
                                          float: "left",
                                          marginLeft: "70px",
                                        }}
                                      >
                                        {finalTranslation.outstanding_heading}
                                      </span>
                                      {/* </td> */}

                                      <ul
                                        style={{
                                          color: "#01979C",
                                          fontSize: "19px",
                                          lineHeight: "38px",
                                          paddingLeft: "32px",
                                          margin: "0px",
                                          paddingTop: "0px",
                                        }}
                                      >
                                        {testResultData &&
                                          Object.keys(emotional).map(
                                            (e, idx) => {
                                              if (
                                                emotional[e][testResultData[e]]
                                              ) {
                                                let highlightValues = emotional[
                                                  e
                                                ][testResultData[e]].find(
                                                  (e) => e.highlight
                                                );

                                                const finalValue =
                                                  highlightValues?.highlight;

                                                if (finalValue) {
                                                  if (finalValue === "0")
                                                    return;

                                                  return <li>{finalValue}</li>;
                                                }
                                              }
                                            }
                                          )}
                                      </ul>
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
              </td>
            </tr>
            <tr>
              <td>
                <table className="fourthTable" cellSpacing={0} cellPadding={0}>
                  <tbody>
                    <tr>
                      <td>
                        <table
                          className="fourthInnerTable"
                          cellSpacing={0}
                          cellPadding={0}
                        >
                          <tbody>
                            <tr>
                              <td
                                width="50%"
                                style={{
                                  width: "50%",
                                  paddingRight: "0px",
                                }}
                                valign="top"
                              >
                                <div className="div-one">
                                  <img
                                    src="/images/iconhuman.png"
                                    style={{
                                      float: "left",
                                      padding: "6px 62px 14px 0",
                                    }}
                                  />
                                  <h3
                                    style={{
                                      color: "#5B5BA1",
                                      fontSize: "40px",
                                      lineHeight: "69px",
                                      fontWeight: 500,
                                      fontStyle: "italic",
                                      padding: "28px 0px 43px",
                                      margin: "0px",
                                    }}
                                  >
                                    {finalTranslation.relational_heading}
                                  </h3>
                                </div>
                                <ul
                                  style={{
                                    color: "#01979C",
                                    fontSize: "19px",
                                    lineHeight: "38px",
                                    paddingLeft: "82px",
                                    margin: "0px",
                                    paddingTop: "0px",
                                  }}
                                >
                                  {testResultData &&
                                    Object.keys(relational).map((e, idx) => {
                                      if (relational[e][testResultData[e]]) {
                                        let interObj = relational[e][
                                          testResultData[e]
                                        ].find((e) => e.highlight != "0");

                                        let interpretation = interObj
                                          ? interObj.interpretation
                                          : relational[e][testResultData[e]][0]
                                              .interpretation;
                                        const zeroValues =
                                          interpretation === "0";

                                        if (zeroValues) return;

                                        return (
                                          <li key={"work - " + idx}>
                                            {interpretation}
                                          </li>
                                        );
                                      }
                                    })}
                                </ul>
                              </td>
                              <td
                                width="50%"
                                style={{ width: "50%" }}
                                valign="top"
                              >
                                <table className="fourthInnerRight pdf-table">
                                  <tbody>
                                    <tr>
                                      {/* <td valign="top"> */}

                                      <span
                                        style={{
                                          color: "#5B5BA1",
                                          background: "#ffffff",
                                          fontSize: "37px",
                                          lineHeight: "53px",
                                          fontWeight: 500,
                                          marginTop: "-97px",
                                          float: "left",
                                          marginLeft: "70px",
                                        }}
                                      >
                                        {finalTranslation.outstanding_heading}
                                      </span>
                                      {/* </td> */}

                                      <ul
                                        style={{
                                          color: "#01979C",
                                          fontSize: "19px",
                                          lineHeight: "38px",
                                          paddingLeft: "32px",
                                          margin: "0px",
                                          paddingTop: "0px",
                                        }}
                                      >
                                        {testResultData &&
                                          Object.keys(relational).map(
                                            (e, idx) => {
                                              if (
                                                relational[e][testResultData[e]]
                                              ) {
                                                let highlightValues =
                                                  relational[e][
                                                    testResultData[e]
                                                  ].find((e) => e.highlight);

                                                const finalValue =
                                                  highlightValues?.highlight;

                                                if (finalValue) {
                                                  if (finalValue === "0")
                                                    return;

                                                  return <li>{finalValue}</li>;
                                                }
                                              }
                                            }
                                          )}
                                      </ul>
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
              </td>
            </tr>

            <tr>
              <td>
                <table className="fourthTable" cellSpacing={0} cellPadding={0}>
                  <tbody>
                    <tr>
                      <td>
                        <table
                          className="fourthInnerTable"
                          cellSpacing={0}
                          cellPadding={0}
                        >
                          <tbody>
                            <tr>
                              <td
                                width="50%"
                                style={{
                                  width: "50%",
                                  paddingRight: "0px",
                                }}
                                valign="top"
                              >
                                <div className="div-one">
                                  <img
                                    src="/images/iconcase.png"
                                    style={{
                                      float: "left",
                                      padding: "6px 62pxF 14px 0",
                                    }}
                                  />
                                  <h3
                                    style={{
                                      color: "#5B5BA1",
                                      fontSize: "40px",
                                      lineHeight: "69px",
                                      fontWeight: 500,
                                      fontStyle: "italic",
                                      padding: "28px 0px 43px",
                                      margin: "0px",
                                    }}
                                  >
                                    {finalTranslation.laboral_heading}
                                  </h3>
                                </div>
                                <ul
                                  style={{
                                    color: "#01979C",
                                    fontSize: "19px",
                                    lineHeight: "38px",
                                    paddingLeft: "82px",
                                    margin: "0px",
                                    paddingTop: "0px",
                                  }}
                                >
                                  {testResultData &&
                                    Object.keys(work).map((e, idx) => {
                                      if (work[e][testResultData[e]]) {
                                        let interObj = work[e][
                                          testResultData[e]
                                        ].find((e) => e.highlight != "0");

                                        let interpretation = interObj
                                          ? interObj.interpretation
                                          : work[e][testResultData[e]][0]
                                              .interpretation;

                                        const zeroValues =
                                          interpretation === "0";

                                        if (zeroValues) return;

                                        return (
                                          <li key={"work - " + idx}>
                                            {interpretation}
                                          </li>
                                        );
                                      }
                                    })}
                                </ul>
                              </td>
                              <td
                                width="50%"
                                style={{ width: "50%" }}
                                valign="top"
                              >
                                <table className="fourthInnerRight pdf-table">
                                  <tbody>
                                    <tr>
                                      {/* <td valign="top"> */}

                                      <span
                                        style={{
                                          color: "#5B5BA1",
                                          background: "#ffffff",
                                          fontSize: "37px",
                                          lineHeight: "53px",
                                          fontWeight: 500,
                                          marginTop: "-97px",
                                          float: "left",
                                          marginLeft: "70px",
                                        }}
                                      >
                                        {finalTranslation.outstanding_heading}
                                      </span>
                                      {/* </td> */}
                                      <ul
                                        style={{
                                          color: "#01979C",
                                          fontSize: "19px",
                                          lineHeight: "38px",
                                          paddingLeft: "32px",
                                          margin: "0px",
                                          paddingTop: "0px",
                                        }}
                                      >
                                        {testResultData &&
                                          Object.keys(work).map((e, idx) => {
                                            if (work[e][testResultData[e]]) {
                                              let highlightValues = work[e][
                                                testResultData[e]
                                              ].find((e) => e.highlight);

                                              const finalValue =
                                                highlightValues?.highlight;

                                              if (finalValue) {
                                                if (finalValue === "0") return;

                                                return <li>{finalValue}</li>;
                                              }
                                            }
                                          })}
                                      </ul>
                                      {/* </tr> */}
                                      {/* </td> */}
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
              </td>
            </tr>

            <tr>
              <td>
                <table
                  className="fourthTable"
                  style={{
                    width: "100%",
                    backgroundColor: "#3E3470",
                    padding: "0px 39px 53px",
                    fontFamily: '"Jost", arial',
                  }}
                  cellSpacing={0}
                  cellPadding={0}
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          className="fourthInnerTable pdf-table"
                          style={{
                            width: "100%",
                            color: "#5B5BA1",
                            border: "1px solid #948BC0",
                            backgroundColor: "#ffffff",
                            padding: "0px 39px",
                            fontFamily: '"Jost", arial',
                            borderRadius: 34,
                            WebkitBorderRadius: 34,
                          }}
                          cellSpacing={0}
                          cellPadding={0}
                        >
                          <thead>
                            <tr>
                              <td
                                style={{
                                  fontSize: 37,
                                  fontWeight: 500,
                                  fontStyle: "italic",
                                  borderBottom: "1px solid #948BC0",
                                  padding: "26px 0px",
                                }}
                              >
                                {finalTranslation.analysed_text}
                              </td>
                              <td
                                style={{
                                  fontSize: 37,
                                  fontWeight: 500,
                                  fontStyle: "italic",
                                  borderBottom: "1px solid #948BC0",
                                  padding: "26px 0px",
                                  textAlign: "center",
                                }}
                              >
                                {finalTranslation.desired_text}
                              </td>
                              <td
                                style={{
                                  fontSize: 37,
                                  fontWeight: 500,
                                  fontStyle: "italic",
                                  borderBottom: "1px solid #948BC0",
                                  padding: "26px 0px",
                                  textAlign: "center",
                                }}
                              >
                                {finalTranslation.obtain_text}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {/* <tr>
                              <td
                                style={{
                                  fontSize: 28,
                                  fontWeight: 600,
                                  borderBottom: "1px solid #948BC0",
                                  padding: "13px 26px",
                                }}
                              >
                                {testResultData &&
                                  Object.keys(work).map((e, idx) => {
                                    if (intellectual[e][testResultData[e]]) {
                                      let highlightValues = intellectual[e][
                                        testResultData[e]
                                      ].find((e) => e.skill);

                                      const finalValue = highlightValues?.skill;

                                      if (finalValue) {
                                        if (finalValue === "0") return;

                                        return <li>{finalValue}</li>;
                                      }
                                    }
                                  })}{" "}
                              </td>
                              <td
                                style={{
                                  fontSize: 31,
                                  fontWeight: 500,
                                  borderBottom: "1px solid #948BC0",
                                  padding: "13px 0px",
                                  textAlign: "center",
                                }}
                              >
                                <img
                                  src="/images/check-circle.png"
                                  style={{ height: "21px" }}
                                />
                              </td>
                              <td
                                style={{
                                  fontSize: 31,
                                  fontWeight: 600,
                                  borderBottom: "1px solid #948BC0",
                                  padding: "13px 0px",
                                  textAlign: "center",
                                }}
                              >
                                <img
                                  src="/images/x-circle.png"
                                  style={{ height: "21px" }}
                                />
                              </td>
                            </tr> */}
                            {/* <tr>
                              <td
                                style={{
                                  fontSize: 28,
                                  fontWeight: 600,
                                  borderBottom: "1px solid #948BC0",
                                  padding: "13px 26px",
                                }}
                              >
                                {finalTranslation.proactivity_text}
                              </td>
                              <td
                                style={{
                                  fontSize: 31,
                                  fontWeight: 500,
                                  borderBottom: "1px solid #948BC0",
                                  padding: "13px 0px",
                                  textAlign: "center",
                                }}
                              >
                                <img
                                  src="/images/check-circle.png"
                                  style={{ height: "21px" }}
                                />
                              </td>
                              <td
                                style={{
                                  fontSize: 31,
                                  fontWeight: 500,
                                  borderBottom: "1px solid #948BC0",
                                  padding: "13px 0px",
                                  textAlign: "center",
                                }}
                              >
                                <img
                                  src="/images/x-circle.png"
                                  style={{ height: "21px" }}
                                />
                              </td>
                            </tr> */}
                            {/* <td> */}
                            {skillData.map((e) => { 
                              let selectedVal = false;
                              return (
                              <>
                                <tr>
                                  <td
                                    style={{
                                      fontSize: 28,
                                      fontWeight: 600,
                                      borderBottom: "1px solid #948BC0",
                                      padding: "13px 26px",
                                      // width : "50%"
                                    }}
                                  >
                                    {" "}
                                    {e.name}
                                  </td>

                                  <td
                                    style={{
                                      fontSize: 31,
                                      fontWeight: 500,
                                      padding: "26px 0px",
                                      textAlign: "center",
                                      borderBottom: "1px solid #948BC0",
                                    }}
                                  >
                                    <img
                                      src="/images/check-circle.png"
                                      style={{ height: "21px" }}
                                    />
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 31,
                                      fontWeight: 500,
                                      padding: "26px 0px",
                                      textAlign: "center",
                                      borderBottom: "1px solid #948BC0",
                                    }}
                                  >
                                    {Object.keys(intellectual).map(
                                      (val, idx) => {
                                        // console.log(intellectual[e][testResultData[e]], "FGHUJIKOL")
                                        intellectual[val][
                                          testResultData[val]
                                        ]?.map((intel) => {
                                          if (
                                            e.name === intel.skill &&
                                            e.value === intel.value
                                          ) {

                                            console.log(
                                              e.name,
                                              e.value,
                                              "<----- NAME",
                                              "<----- Value"
                                            );
                                            console.log(
                                              intel.skill,
                                              intel.value,
                                              "<----- INTEL NAME",
                                              "<----- INTEL Value"
                                            );
                                           if(!selectedVal){
                                            selectedVal = true;
                                            successImageToShow = true;
                                           }
                                          }
                                        });
                                      }
                                    )}
                                    {Object.keys(emotional).map((val, idx) => {
                                      // console.log(intellectual[e][testResultData[e]], "FGHUJIKOL")
                                      emotional[val][testResultData[val]]?.map(
                                        (intel) => {
                                          console.log(
                                            e.name,
                                            intel.skill,
                                            "emotional"
                                          );
                                          if (
                                            e.name === intel.skill &&
                                            e.value === intel.value
                                          ) {
                                           
                                            console.log(
                                              e.name,
                                              e.value,
                                              "<----- NAME",
                                              "<----- Value"
                                            );
                                            console.log(
                                              intel.skill,
                                              intel.value,
                                              "<----- INTEL NAME",
                                              "<----- INTEL Value"
                                            );
                                            if(!selectedVal){
                                              selectedVal = true;
                                              successImageToShow = true;
                                             }                                          }
                                        }
                                      );
                                    })}
                                    {Object.keys(work).map((val, idx) => {
                                      // console.log(intellectual[e][testResultData[e]], "FGHUJIKOL")
                                      work[val][testResultData[val]]?.map(
                                        (intel) => {
                                          if (
                                            e.name === intel.skill &&
                                            e.value === intel.value
                                          ) {

                                            console.log(
                                              e.name,
                                              e.value,
                                              "<----- NAME",
                                              "<----- Value"
                                            );
                                            console.log(
                                              intel.skill,
                                              intel.value,
                                              "<----- INTEL NAME",
                                              "<----- INTEL Value"
                                            );
                                           
                                            // console.log(e.name, e.value, '<----- NAME', '<-------Value')
                                            // console.log(intel.skill, intel.value, '<----- INTEL NAME', '<------- INTEL Value')
                                            if(!selectedVal){
                                              selectedVal = true;
                                              successImageToShow = true;
                                             }                                          }
                                        }
                                      );
                                    })}
                                    {Object.keys(relational).map((val, idx) => {
                                     
                                      // console.log(intellectual[e][testResultData[e]], "FGHUJIKOL")
                                      relational[val][testResultData[val]]?.map(
                                        (intel) => {
                                          if (
                                            e.name === intel.skill &&
                                            e.value === intel.value
                                          ) {

                                            console.log(
                                              e.name,
                                              e.value,
                                              "<----- NAME",
                                              "<----- Value"
                                            );
                                            console.log(
                                              intel.skill,
                                              intel.value,
                                              "<----- INTEL NAME",
                                              "<----- INTEL Value"
                                            );
                                           
                                            // console.log(e.name, e.value, '<----- NAME', '<-------Value')
                                            // console.log(intel.skill, intel.value, '<----- INTEL NAME', '<------- INTEL Value')
                                            if(!selectedVal){
                                              selectedVal = true;
                                              successImageToShow = true;
                                             }
                                          }
                                        }
                                      );
                                    })}

                                    <img
                                      src={
                                        selectedVal
                                          ? "/images/check-circle.png"
                                          : "/images/x-circle.png"
                                      }
                                      style={{ height: "21px" }}
                                    />
                                  </td>
                                </tr>
                              </>
                            )})}
                            {/* </td> */}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <table
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    padding: "15px 133px",
                    fontFamily: '"Jost", arial',
                    textAlign: "center",
                  }}
                  cellSpacing={0}
                  cellPadding={0}
                >
                  <tbody>
                    <tr>
                      <td
                        valign="center"
                        style={{
                          borderRight: "1px solid #01979C",
                          width: "25%",
                        }}
                      >
                        <img src="/images/footer-logo.png" />
                      </td>
                      <td
                        valign="center"
                        style={{
                          fontSize: "26px",
                          color: "#5B5BA1",
                          fontWeight: 400,
                          lineHeight: "37px",
                          fontFamily: '"Jost", arial',
                          borderRight: "1px solid #01979C",
                          width: "25%",
                        }}
                      >
                        contacto@recruitersai.com
                      </td>
                      <td
                        valign="center"
                        style={{
                          fontSize: "26px",
                          color: "#5B5BA1",
                          fontWeight: 400,
                          lineHeight: "37px",
                          fontFamily: '"Jost", arial',
                          borderRight: "1px solid #01979C",
                          width: "25%",
                        }}
                      >
                        www.recruitersai.com
                      </td>
                      <td
                        valign="center"
                        style={{
                          fontSize: "26px",
                          color: "#5B5BA1",
                          fontWeight: 400,
                          lineHeight: "37px",
                          fontFamily: '"Jost", arial',
                          width: "25%",
                        }}
                      >
                        Chile
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    </React.Fragment>
  );
}

export default GeneratePdf;
