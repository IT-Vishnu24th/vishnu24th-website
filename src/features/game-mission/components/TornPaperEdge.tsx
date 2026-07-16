"use client"

const STROKE = {
  morning: "fill-brick-orange",
  evening: "fill-midnight",
} as const

const FILL_BELOW = {
  morning: "fill-cream-tanned",
  evening: "fill-mint",
} as const

type Period = "morning" | "evening"

export function TornPaperEdge({ period }: { period: Period }) {
  return (
    <div className="relative -mt-4.5 h-12 w-full" aria-hidden>
      <svg
        viewBox="0 0 408 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M397.822 19.5C345.452 31.6352 276.662 39 201.322 39C125.981 39 57.1915 31.6353 4.82178 19.5V18H397.822V19.5Z"
          className={STROKE[period]}
        />
        <g>
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(387.27 23.0249) scale(0.0475779) rotate(-64.186)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(402.307 19.7935) scale(0.055177) rotate(126.236)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(388.525 25.3378) scale(0.0282667) rotate(160.505)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(374.459 25.7104) scale(0.0201826) rotate(-70.0878)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(371.677 23.1848) scale(0.018123) rotate(-26.209)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(369.789 26.8985) scale(0.0159724) rotate(-82.2033)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(372.292 36.2848) scale(0.0501478) rotate(-160.528)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(365.484 28.7896) scale(0.0169848) rotate(160.906)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(358.754 23.3087) scale(0.017197) rotate(39.3177)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(361.493 26.7592) scale(0.0259811) rotate(130.06)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(339.76 28.7066) scale(0.0433097) rotate(-43.7871)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(343.633 16.3897) scale(0.0588378) rotate(53.5211)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(343.41 26.4928) scale(0.0522926) rotate(109.661)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(323.074 43.3008) scale(0.0488154) rotate(-131.785)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(328.68 35.2296) scale(0.0595992) rotate(142.967)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(307.507 38.1879) scale(0.0183983) rotate(-122.887)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(300.672 47.2136) scale(0.0531188) rotate(-126.924)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(284.306 28.8844) scale(0.0484741) rotate(-15.0287)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(292.714 38.0147) scale(0.0197862) rotate(157.82)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(293.149 34.4149) scale(0.0430636) rotate(125.103)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(263.947 34.3545) scale(0.05044) rotate(-33.2934)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(274.997 44.3675) scale(0.0467519) rotate(179.817)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(265.105 35.7392) scale(0.0155478) rotate(96.8492)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(243.854 41.1047) scale(0.0550304) rotate(-59.9147)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(250.421 28.6635) scale(0.0417526) rotate(56.9914)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(238.317 45.6648) scale(0.034244) rotate(-108.711)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(245.46 39.1615) scale(0.042812) rotate(140.871)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(224.129 49.5635) scale(0.0489542) rotate(-116.513)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(219.825 41.1416) scale(0.0150967) rotate(-84.934)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(223.664 36.7007) scale(0.017828) rotate(111.834)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(220.427 48.5559) scale(0.0474471) rotate(-168.697)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(214.807 44.8016) scale(0.0416645) rotate(170.672)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(206.105 38.9652) scale(0.0174059) rotate(138.011)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(198.559 35.5225) scale(0.0159013) rotate(33.3566)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(192.641 36.6361) scale(0.0192483) rotate(-10.9263)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(191.824 32.7358) scale(0.0244581) rotate(35.4424)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(195.322 43.4838) scale(0.0376461) rotate(161.941)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(177.484 39.3059) scale(0.022088) rotate(-56.2517)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(180.253 31.4987) scale(0.0309917) rotate(61.2265)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(174.697 35.5263) scale(0.0160165) rotate(51.7504)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(174.962 40.2684) scale(0.0150662) rotate(152.72)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(171.885 34.3198) scale(0.0218747) rotate(84.7174)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(175.273 35.9491) scale(0.0580706) rotate(124.179)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(156.965 33.1963) scale(0.0223078) rotate(63.8982)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(149.308 50.7435) scale(0.0559931) rotate(-138.342)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(134.771 25.6072) scale(0.0532771) rotate(21.3079)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(132.562 39.7592) scale(0.0149919) rotate(-112.043)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(132.701 48.3928) scale(0.0522974) rotate(-156.679)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(123.457 41.7604) scale(0.0244345) rotate(-150.801)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(112.858 22.6005) scale(0.0588506) rotate(35.2548)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(98.8153 27.8107) scale(0.0444414) rotate(-3.44351)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(90.8503 41.3418) scale(0.0460741) rotate(-86.716)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(83.6385 42.5847) scale(0.0500941) rotate(-96.7112)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(85.2804 22.9594) scale(0.0434909) rotate(55.893)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(71.5477 44.509) scale(0.0562026) rotate(-120.477)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(73.1973 29.7569) scale(0.0196549) rotate(119.741)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(72.8871 38.0729) scale(0.0563147) rotate(172.123)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(52.6052 28.5926) scale(0.0166988) rotate(-34.735)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(51.4647 31.8507) scale(0.0152595) rotate(-95.2739)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(56.3677 19.2714) scale(0.051688) rotate(86.3384)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(33.6069 37.8229) scale(0.0539921) rotate(-107.371)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(38.4383 30.3293) scale(0.0350943) rotate(177.044)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(28.6323 18.3044) scale(0.024791) rotate(55.6896)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(22.8555 16.5043) scale(0.0307794) rotate(44.5083)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(12.6759 10.5894) scale(0.0522499) rotate(28.259)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(7.35247 11.4489) scale(0.0384399) rotate(35.3052)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(10.4003 22.7821) scale(0.0301458) rotate(174.359)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(8.27403 10.3854) scale(0.0352951) rotate(28.961)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(11.1612 16.3088) scale(0.0185934) rotate(-16.1392)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(12.3041 11.4492) scale(0.0445737) rotate(-4.98256)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(23.1059 27.7585) scale(0.0447491) rotate(-110.037)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(47.7974 11.005) scale(0.0589707) rotate(100.954)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(39.4357 20.3048) scale(0.0170337) rotate(-82.9874)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(40.9508 16.6853) scale(0.0209139) rotate(-35.5924)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(47.5927 14.4856) scale(0.0150804) rotate(24.9159)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(47.5184 18.2162) scale(0.0166976) rotate(-50.6623)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(64.6261 20.7733) scale(0.0388854) rotate(153.437)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(58.6403 14.7403) scale(0.0152953) rotate(12.0476)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(64.386 14.8775) scale(0.0158641) rotate(63.8683)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(77.6588 15.16) scale(0.042778) rotate(118.657)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(72.62 11.7233) scale(0.0272398) rotate(33.0967)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(75.0744 14.1057) scale(0.0200747) rotate(8.85334)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(84.4225 16.9334) scale(0.0161229) rotate(117.673)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(81.0503 24.9821) scale(0.0324499) rotate(-105.626)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(90.3975 21.3362) scale(0.0177653) rotate(-154.851)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(94.898 16.4579) scale(0.015787) rotate(100.509)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(91.2476 16.1391) scale(0.017415) rotate(-10.9806)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(96.2345 22.4232) scale(0.0200683) rotate(-117.32)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(100.964 29.6981) scale(0.0532772) rotate(-122.448)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(101.346 20.9523) scale(0.0492691) rotate(-62.7535)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(116.961 11.7185) scale(0.0257527) rotate(28.4121)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(125.336 16.8414) scale(0.0156342) rotate(108.136)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(120.468 14.3351) scale(0.0273168) rotate(-9.64056)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(131.917 15.1584) scale(0.0174042) rotate(83.303)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(128.863 23.3379) scale(0.0295809) rotate(-96.1684)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(142.771 31.6164) scale(0.0583573) rotate(-144.911)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(149.526 20.0583) scale(0.016033) rotate(177.275)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(157.624 22.0493) scale(0.0326912) rotate(161.747)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(164.047 10.3653) scale(0.0432329) rotate(87.2057)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(156.79 17.3048) scale(0.0266749) rotate(-38.9612)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(174.333 6.06709) scale(0.0551205) rotate(64.8973)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(179.249 23.3063) scale(0.027192) rotate(-159.852)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(176.883 11.0456) scale(0.0369541) rotate(8.05339)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(195.379 27.8042) scale(0.0492801) rotate(-168.312)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(191.771 15.9145) scale(0.0168652) rotate(-3.23109)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(200.703 22.7338) scale(0.0239985) rotate(-163.563)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(206 5.12239) scale(0.0547071) rotate(50.4087)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(215.429 26.8936) scale(0.0392117) rotate(-154.639)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(228.251 21.6265) scale(0.0412421) rotate(153.676)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(228.681 16.832) scale(0.0199441) rotate(116.121)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(219.421 18.5025) scale(0.0432259) rotate(-49.262)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(238.234 19.2871) scale(0.0171796) rotate(157.422)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(248.948 18.9983) scale(0.0412729) rotate(142.945)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(240.662 14.7101) scale(0.0240586) rotate(-3.77664)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(253.632 18.9314) scale(0.0219937) rotate(150.022)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(247.756 17.7562) scale(0.0183124) rotate(-45.272)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(249.758 9.15499) scale(0.0501847) rotate(1.4161)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(265.694 15.2942) scale(0.015838) rotate(85.8205)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(262.471 11.1353) scale(0.0358891) rotate(7.07142)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(272.584 25.0557) scale(0.0291521) rotate(-132.533)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(283.25 6.55876) scale(0.0510496) rotate(61.8865)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(285.95 22.6275) scale(0.0176111) rotate(-143.988)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(294.25 21.6201) scale(0.0278523) rotate(172.646)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(291.954 13.2242) scale(0.0237306) rotate(28.7685)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(303.694 25.7395) scale(0.0380245) rotate(-170.821)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(307.252 17.9912) scale(0.0174819) rotate(142.151)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(309.755 19.9973) scale(0.0183742) rotate(168.164)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(312.68 18.3886) scale(0.0157087) rotate(140.124)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(309.432 14.676) scale(0.0197731) rotate(10.832)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(319.663 4.90412) scale(0.0565394) rotate(50.0499)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(330.455 17.5868) scale(0.0234699) rotate(128.269)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(331.983 22.4473) scale(0.0229831) rotate(-171.17)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(332.347 27.2423) scale(0.0406573) rotate(-124.694)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(341.874 20.3048) scale(0.01567) rotate(168.791)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(339.224 12.7794) scale(0.0271688) rotate(14.0665)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(342.096 16.0929) scale(0.0215066) rotate(-16.2504)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(356.344 5.61272) scale(0.0547758) rotate(60.2225)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(368.128 28.2827) scale(0.0503334) rotate(-169.524)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(358.855 17.6857) scale(0.0460729) rotate(-42.083)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(371.943 9.64554) scale(0.04364) rotate(14.0826)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(378.391 17.3252) scale(0.0158873) rotate(-34.407)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(382.794 13.7825) scale(0.0184189) rotate(15.1666)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(389.906 21.1805) scale(0.0177723) rotate(-164.528)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(387.209 22.5804) scale(0.0269966) rotate(-91.2475)"
          />
          <use
            xlinkHref="#stroke0_1_4"
            transform="translate(411.286 16.7096) scale(0.0569424) rotate(125.257)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(9.12886 12.6554) scale(0.02069) rotate(142.071)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(2.72989 11.1272) scale(0.0231597) rotate(-28.8147)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(8.73832 11.1017) scale(0.0144039) rotate(4.43278)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(15.7163 13.82) scale(0.0113834) rotate(133.238)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(16.6844 15.7937) scale(0.0105078) rotate(176.638)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(18.6103 14.1643) scale(0.00953967) rotate(120.223)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(18.7058 10.2185) scale(0.0215252) rotate(41.166)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(20.0145 13.8343) scale(0.0100026) rotate(1.88164)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(22.5795 18.2443) scale(0.010098) rotate(-120.095)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(22.0321 15.8221) scale(0.0136107) rotate(-29.8222)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(32.0716 18.3812) scale(0.0193029) rotate(155.637)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(28.7689 22.6026) scale(0.0243495) rotate(-108.006)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(30.1067 18.7114) scale(0.0222223) rotate(-52.853)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(40.4805 14.4242) scale(0.0210922) rotate(64.8303)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(37.2841 17.2116) scale(0.024597) rotate(-21.3147)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(46.5887 17.7761) scale(0.0106277) rotate(72.1882)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(50.261 15.4018) scale(0.0224908) rotate(67.5693)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(55.1788 24.7379) scale(0.0209813) rotate(178.681)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(52.3009 19.6335) scale(0.0112187) rotate(-9.00553)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(52.3798 21.5738) scale(0.0192229) rotate(-42.2115)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(64.8612 24.2708) scale(0.0216202) rotate(158.704)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(61.0518 19.0873) scale(0.0204216) rotate(11.1165)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(64.2422 23.8595) scale(0.00934159) rotate(-72.3089)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(74.2419 23.0272) scale(0.0231121) rotate(130.423)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(70.6312 27.9681) scale(0.0187968) rotate(-113.337)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(77.4684 21.1328) scale(0.0163565) rotate(80.4328)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(73.7858 23.7696) scale(0.0191411) rotate(-30.5142)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(83.7248 20.6768) scale(0.0211373) rotate(71.4906)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(85.7916 24.2198) scale(0.00912851) rotate(102.636)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(83.2049 26.4853) scale(0.0103784) rotate(-60.838)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(86.0423 21.3625) scale(0.0206475) rotate(18.1934)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(88.1872 23.216) scale(0.0187682) rotate(-3.01459)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(91.4443 26.2098) scale(0.0101913) rotate(-36.0702)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(95.6572 28.7539) scale(0.00950666) rotate(-140.963)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(99.1135 28.3503) scale(0.0109922) rotate(174.504)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(99.3011 30.3291) scale(0.013057) rotate(-139.43)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(98.2398 24.8111) scale(0.0174622) rotate(-13.3436)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(106.92 27.3991) scale(0.012152) rotate(128.066)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(105.103 31.1808) scale(0.0152995) rotate(-114.814)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(108.054 29.7694) scale(0.00956013) rotate(-124.611)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(108.051 26.9269) scale(0.00911402) rotate(-23.8651)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(109.803 30.3403) scale(0.0120679) rotate(-92.1275)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(109.182 29.1124) scale(0.0241001) rotate(-53.1835)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(116.722 31.262) scale(0.0122383) rotate(-113.986)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(120.643 23.4334) scale(0.023425) rotate(43.2607)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(126.531 34.1349) scale(0.0225423) rotate(-157.792)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(128.041 27.5955) scale(0.00907865) rotate(68.4006)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(127.938 24.4656) scale(0.0222239) rotate(23.3111)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(131.899 26.7128) scale(0.0130483) rotate(28.6688)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(136.844 35.2123) scale(0.0243536) rotate(-145.841)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(142.982 33.1426) scale(0.0196707) rotate(174.759)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(146.232 27.0094) scale(0.0202013) rotate(90.8554)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(149.22 26.358) scale(0.0215078) rotate(80.1802)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(149.06 34.9395) scale(0.0193617) rotate(-127.892)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(154.262 25.2767) scale(0.0234931) rotate(55.0025)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(153.66 31.7354) scale(0.0111637) rotate(-65.3618)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(154.345 28.0812) scale(0.0235295) rotate(-13.5759)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(164.089 31.1993) scale(0.00987313) rotate(138.98)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(164.577 29.1835) scale(0.00920576) rotate(78.1601)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(163.028 35.3003) scale(0.0220258) rotate(-100.788)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(171.552 26.2523) scale(0.0227746) rotate(64.6077)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(169.748 29.5031) scale(0.0166329) rotate(-11.7722)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(175.349 34.7456) scale(0.0131798) rotate(-133.694)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(178.43 34.9273) scale(0.0152305) rotate(-145.42)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(183.288 36.1115) scale(0.0222084) rotate(-162.493)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(185.729 35.618) scale(0.0177202) rotate(-156.389)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(189.651 34.1683) scale(0.0150246) rotate(175.137)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(188.643 28.1765) scale(0.0166981) rotate(29.6049)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(189.748 30.7754) scale(0.0107121) rotate(-15.611)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(190.979 28.9178) scale(0.0197137) rotate(-4.58286)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(195.717 36.1654) scale(0.0197707) rotate(-109.803)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(206.186 29.0128) scale(0.0243927) rotate(101.001)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(202.422 33.2199) scale(0.0100246) rotate(-83.0853)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(203.401 31.1474) scale(0.011683) rotate(-35.7817)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(207.106 29.7368) scale(0.0091208) rotate(24.6389)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(207.107 31.9836) scale(0.00987257) rotate(-51.0195)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(215.673 33.0466) scale(0.017865) rotate(152.962)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(212.8 29.8633) scale(0.00922268) rotate(11.4591)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(216.251 29.8628) scale(0.00948935) rotate(63.2006)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(222.203 30.4085) scale(0.0191301) rotate(117.868)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(219.984 28.4771) scale(0.014053) rotate(32.1674)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(221.213 29.5008) scale(0.0113387) rotate(7.81631)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(226.675 30.9558) scale(0.0096093) rotate(116.547)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(224.871 35.03) scale(0.0157734) rotate(-106.86)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(229.661 33.5155) scale(0.0103507) rotate(-156.196)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(232.283 30.4829) scale(0.00945347) rotate(99.0793)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(230.118 30.3838) scale(0.0101954) rotate(-12.4945)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(233.131 33.9345) scale(0.0113361) rotate(-118.926)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(235.66 36.2803) scale(0.0225423) rotate(-124.199)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(235.658 32.615) scale(0.0212397) rotate(-64.6934)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(242.271 27.8559) scale(0.013529) rotate(26.3217)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(247.102 30.2231) scale(0.00938208) rotate(105.946)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(244.379 29.1795) scale(0.0140796) rotate(-11.9323)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(250.561 29.1269) scale(0.0101906) rotate(80.9055)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(249.126 33.5622) scale(0.0148407) rotate(-98.6756)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(255.628 36.2523) scale(0.0241933) rotate(-147.59)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(258.969 31.7022) scale(0.00956774) rotate(174.447)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(262.771 32.2016) scale(0.0158519) rotate(158.807)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(265.186 26.6698) scale(0.0192779) rotate(84.1087)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(261.829 29.9157) scale(0.0138562) rotate(-42.2069)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(269.738 24.8123) scale(0.0231414) rotate(61.485)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(272.739 32.385) scale(0.0140364) rotate(-163.433)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(271.236 26.4796) scale(0.0172373) rotate(4.32954)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(279.982 33.3893) scale(0.0212433) rotate(-172.214)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(277.812 28.0104) scale(0.00994859) rotate(-7.27654)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(283.097 31.4741) scale(0.0128858) rotate(-167.714)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(284.656 23.3555) scale(0.023007) rotate(46.0884)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(289.571 32.5143) scale(0.017971) rotate(-159.153)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(295.164 29.6215) scale(0.0186309) rotate(148.987)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(295.852 27.2093) scale(0.0112845) rotate(111.288)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(291.487 28.487) scale(0.0192756) rotate(-54.2436)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(300.616 28.2489) scale(0.0100902) rotate(152.297)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(305.096 27.4795) scale(0.0186409) rotate(137.678)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(300.981 25.6408) scale(0.0129082) rotate(-9.20089)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(308.222 27.2743) scale(0.0121149) rotate(144.472)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(304.861 26.9398) scale(0.0105904) rotate(-50.9364)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(306.207 23.1055) scale(0.0215372) rotate(-4.41241)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(313.857 24.5158) scale(0.00947721) rotate(79.8326)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(312.034 23.0908) scale(0.0168912) rotate(0.945993)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(317.568 29.3254) scale(0.0146997) rotate(-138.825)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(321.371 20.3934) scale(0.0218183) rotate(55.4011)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(323.698 27.7224) scale(0.0102826) rotate(-150.647)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(327.888 26.4228) scale(0.0142633) rotate(165.855)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(326.206 22.1367) scale(0.012785) rotate(21.828)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(332.613 27.5836) scale(0.0175852) rotate(-177.93)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(334.473 23.7607) scale(0.0102252) rotate(134.885)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(336.039 24.7062) scale(0.0106172) rotate(160.78)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(337.697 23.5236) scale(0.00941692) rotate(132.625)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(335.506 21.6425) scale(0.0112132) rotate(3.21464)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(339.879 17.4777) scale(0.0236025) rotate(42.2284)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(345.948 21.9085) scale(0.0126863) rotate(120.232)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(347.164 24.4013) scale(0.0125002) rotate(-179.359)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(347.484 26.1441) scale(0.0184408) rotate(-133.072)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(351.975 22.6147) scale(0.00939886) rotate(160.241)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(349.873 18.8273) scale(0.0140284) rotate(5.36882)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(351.478 20.2166) scale(0.0119216) rotate(-25.1127)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(357.56 15.0811) scale(0.0230293) rotate(51.1341)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(364.079 23.796) scale(0.0215856) rotate(-178.906)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(359.355 19.9688) scale(0.0202009) rotate(-51.7484)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(364.384 15.489) scale(0.0194102) rotate(4.14303)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(367.427 18.2909) scale(0.00950015) rotate(-44.551)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(369.668 15.8677) scale(0.0106366) rotate(4.87864)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(374.501 19.3462) scale(0.0103538) rotate(-174.969)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(373.192 20.0773) scale(0.0139686) rotate(-101.868)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(376.163 11.3704) scale(0.0237335) rotate(24.3534)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(378.623 17.3207) scale(0.0108414) rotate(-70.3434)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(387.547 14.9685) scale(0.0184423) rotate(124.856)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(385.241 17.7518) scale(0.0111751) rotate(-125.269)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(385.063 12.0148) scale(0.0167556) rotate(-3.58625)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(390.353 10.4116) scale(0.014965) rotate(41.5321)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(389.455 17.0782) scale(0.0243535) rotate(-86.9431)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(394.357 13.0369) scale(0.00932437) rotate(-47.6166)"
          />
          <use
            xlinkHref="#stroke1_1_4"
            transform="translate(400.244 12.8608) scale(0.00945891) rotate(141.214)"
          />
        </g>
        <defs>
          <g
            id="stroke0_1_4"
            data-figma-scatter-ref="stroke0_1_4_ref"
            data-figma-scatter="f0.51_w0.06_aj180_sj1_r0_s0_sw10"
          >
            <path
              d="M215.823 333.963C215.823 333.23 216.123 332.93 216.49 333.296C216.856 333.663 216.856 334.263 216.49 334.63C216.123 334.996 215.823 334.696 215.823 333.963ZM143.424 3.97701C148.056 3.32404 151.523 8.80284 148.726 12.3588C146.775 14.8388 146.175 17.9633 147.648 17.9633C148.553 17.9667 158.823 30.3033 158.823 31.3862C158.823 32.4623 154.479 36.4974 152.507 37.2544C150.609 37.9824 151.073 39.9631 153.14 39.9633C153.801 39.9633 154.92 40.8881 155.626 42.02C156.91 44.0739 156.912 44.0744 158.617 42.0766C159.555 40.9766 161.223 39.938 162.323 39.77C163.423 39.601 164.653 39.0132 165.057 38.4633C165.472 37.8983 165.798 38.2253 165.807 39.2133C165.825 41.3531 166.254 41.3818 169.215 39.4419C170.838 38.3789 171.405 37.2303 171.099 35.6313C170.05 30.1434 175.963 30.1199 185.501 35.5737C190.79 38.5976 191.028 38.5792 193.164 34.9633C196.187 29.8454 203.13 33.2701 201.316 38.9838C200.801 40.6068 201.133 41.2309 202.733 41.6499C203.883 41.9499 204.823 42.5946 204.823 43.0805C204.824 43.5654 205.723 43.9633 206.823 43.9633C209.228 43.9633 209.333 43.3299 207.269 41.2661C205.332 39.3301 205.758 35.0191 208.025 33.5991C210.469 32.0694 211.11 33.2632 210.001 37.2797C209.157 40.3355 209.276 40.8478 210.928 41.2797C211.97 41.5527 212.823 42.4936 212.823 43.3696C212.824 45.4861 216.745 45.4516 218.302 43.3227C219.936 41.0879 223.264 42.9574 223.298 46.1294C223.32 48.1552 223.883 48.504 227.573 48.77C231.476 49.053 231.823 48.8831 231.823 46.6811C231.823 45.0832 232.672 43.8975 234.37 43.1245C240.164 40.4845 243.457 43.0685 242.282 49.3315C241.655 52.6722 241.655 52.6725 249.407 53.3745C262.73 54.5825 271.108 62.5852 260.323 63.8012C258.673 63.9882 256.79 64.5797 256.14 65.1167C255.368 65.7556 253.636 65.7276 251.14 65.0346C246.476 63.7398 245.823 63.7172 245.823 64.8549C245.823 65.7449 249.37 66.9616 253.515 67.4936C257.329 67.9826 258.042 68.9656 257.379 72.8286C255.795 82.0527 255.841 81.9633 252.685 81.9633C250.953 81.9633 249.964 81.5443 250.323 80.9633C250.663 80.4133 250.517 79.9633 249.999 79.9633C249.48 79.9633 248.821 79.0632 248.533 77.9633C248.217 76.7553 247.169 75.9633 245.885 75.9633C244.716 75.9632 243.46 75.1762 243.092 74.2133C242.404 72.4103 242.246 72.1833 238.753 67.9633C236.684 65.4633 236.684 65.4633 237.262 68.1733C237.705 70.252 237.359 71.1408 235.772 71.9897C232.719 73.6237 233.414 78.5898 236.633 78.1401C237.903 77.9621 239.585 78.3504 240.37 79.0024C241.211 79.7003 242.9 79.9101 244.485 79.5122C246.95 78.8932 247.055 78.9823 245.748 80.5922C244.844 81.7052 244.78 82.0721 245.573 81.5962C246.78 80.8713 247.26 82.2792 247.055 85.9321C247.01 86.7401 248.281 89.181 249.881 91.3569C252.292 94.6349 252.689 95.9524 252.194 99.0434C251.695 102.167 251.943 102.958 253.722 103.911C255.46 104.841 255.656 105.407 254.789 107.026C254.207 108.114 254.046 109.515 254.431 110.14C255.79 112.339 247.804 110.139 243.089 107.016C234.391 101.254 232.358 104.203 234.165 119.963C234.386 121.888 234.142 123.998 233.622 124.653C231.331 127.54 233.14 131.457 236.823 131.585C238.748 131.652 240.773 131.816 241.323 131.95C241.873 132.084 243.093 132.116 244.034 132.022C246.328 131.792 249.862 133.758 249.563 135.098C249.134 137.018 257.14 136.437 263.279 134.102C266.554 132.856 270.042 132.048 271.029 132.307C272.126 132.594 272.823 132.23 272.823 131.37C272.823 130.597 271.923 129.963 270.823 129.963C268.355 129.963 268.291 128.842 270.596 125.996C272.37 123.806 272.37 123.805 274.251 125.884C277.35 129.307 282.41 126.734 280.041 122.94C279.048 121.351 279.46 120.899 283.362 119.295C285.811 118.288 287.817 117.126 287.819 116.713C287.821 116.301 288.262 115.963 288.798 115.963C290.086 115.963 288.981 121.818 287.134 124.78C286.042 126.531 285.967 127.431 286.825 128.466C288.108 130.011 286.599 133.834 284.133 135.288C283.329 135.762 282.984 136.896 283.321 137.957C283.727 139.236 283.296 139.996 281.916 140.434C280.723 140.812 280.144 141.636 280.471 142.488C281.07 144.051 279.303 146.204 276.573 147.238C275.611 147.602 274.823 148.857 274.823 150.027C274.823 152.253 271.493 157.622 268.86 159.642C267.494 160.689 267.518 160.896 269.075 161.499C270.259 161.958 271.465 161.413 272.792 159.821C274.896 157.295 275.458 157.908 273.83 160.952C272.986 162.526 273.289 162.906 275.83 163.464C279.699 164.314 279.894 168.296 276.323 173.558C272.999 178.456 273.141 179.594 277.811 185.463C279.999 188.213 283.258 192.592 285.055 195.195C287.985 199.439 291.823 201.575 291.823 198.963C291.823 198.413 292.858 197.963 294.123 197.963C295.388 197.963 296.869 197.517 297.413 196.973C298.033 196.353 299.563 196.316 301.501 196.872C303.893 197.558 304.97 197.388 306.229 196.128C311.032 191.326 313.154 199.168 308.775 205.533C305.051 210.945 307.295 210.388 312.57 204.592C314.356 202.629 316.421 201.256 317.16 201.54C317.898 201.822 319.08 201.359 319.785 200.509C321.719 198.179 324.72 198.643 326.009 201.472C327.592 204.947 325.832 207.908 318.196 214.612C312.035 220.021 312.035 220.021 314.929 222.915C319.416 227.402 318.437 230.291 311.993 231.58C309.623 232.053 308.701 231.81 308.231 230.585C307.343 228.271 305.535 228.576 302.783 231.505C300.746 233.674 300.577 234.339 301.632 236.028C303.496 239.014 301.66 241.738 298.126 241.228C293.529 240.565 288.418 246.501 289.907 250.775C290.518 252.528 291.537 253.977 292.171 253.994C292.805 254.011 292.532 254.484 291.565 255.048C290.598 255.611 289.399 255.819 288.9 255.511C288.402 255.203 287.764 255.415 287.483 255.982C287.203 256.549 287.108 256.439 287.273 255.738C287.438 255.037 288.155 254.601 288.867 254.769C289.918 255.018 289.921 254.787 288.886 253.54C288.066 252.551 286.49 252.15 284.467 252.416C282.738 252.642 279.973 252.894 278.323 252.974C276.673 253.055 275.886 253.348 276.573 253.625C277.261 253.904 277.823 254.712 277.823 255.424C277.823 256.136 278.498 257.278 279.323 257.963C284.43 262.201 279.156 267.527 267.467 269.94C261.662 271.138 261.616 271.176 262.217 274.181C262.55 275.849 262.823 278.291 262.823 279.609C262.823 281.174 263.663 282.389 265.244 283.109C266.671 283.759 267.448 284.778 267.136 285.59C265.821 289.017 267.765 292.135 270.801 291.468C274.766 290.597 278.421 292.537 276.707 294.602C276.023 295.427 274.625 295.883 273.602 295.615C272.138 295.233 271.87 295.538 272.348 297.046C272.893 298.763 272.429 298.963 267.889 298.963C262.743 298.963 261.095 297.073 265.249 295.935C268.036 295.172 268.4 292.927 265.844 292.258C264.392 291.879 264.055 291.437 264.845 290.949C266.469 289.946 265.098 283.964 263.244 283.963C262.462 283.963 261.823 283.571 261.823 283.091C261.823 282.611 259.972 281.923 257.709 281.561C255.433 281.197 252.864 280.005 251.959 278.892C250.396 276.971 250.314 277.128 250.111 282.423C249.912 287.635 250.039 287.963 252.254 287.963C257.861 287.963 255.961 295.527 250.118 296.465C248.031 296.8 244.838 297.728 243.022 298.527C240.536 299.621 239.219 299.71 237.687 298.89C235.32 297.624 234.327 298.227 235.168 300.42C235.494 301.269 236.844 301.963 238.169 301.963C242.073 301.963 243.244 304.249 241.284 308.04C239.619 311.258 239.618 311.258 228.221 310.647C216.823 310.036 216.823 310.036 216.823 313.065C216.823 321.686 206.244 322.014 203.987 313.463C202.962 309.577 196.547 308.889 196.016 312.607C195.599 315.535 190.787 316.541 190.083 313.848C189.539 311.771 188.717 311.487 187.273 312.878C186.751 313.382 185.198 313.944 183.823 314.128C182.113 314.357 181.221 315.181 181 316.737C180.739 318.581 180.17 318.937 178 318.615C176.528 318.397 175.418 317.764 175.533 317.21C175.649 316.655 174.861 315.403 173.783 314.427C171.902 312.724 171.821 312.729 171.781 314.558C171.757 315.606 170.365 317.588 168.686 318.963C167.007 320.338 164.438 322.475 162.978 323.712C158.062 327.876 154.556 326.427 153.301 319.713C152.916 317.652 152.42 315.964 152.199 315.963C151.978 315.963 148.55 316.863 144.58 317.963C130.056 321.988 115.58 315.43 128.81 310.818C130.467 310.24 131.823 309.373 131.823 308.89C131.823 308.407 130.668 308.452 129.257 308.988C127.134 309.795 126.098 309.512 123.257 307.345C120.118 304.951 118.274 301.888 120.978 303.558C121.694 304.001 121.861 303.833 121.417 303.115C120.368 301.418 116.504 303.691 117.229 305.579C118.04 307.692 114.948 308.516 113.522 306.566C111.691 304.062 106.546 306.574 107.286 309.61C108.627 315.112 101.84 317.769 99.8455 312.524C98.8953 310.026 94.4089 310.708 90.3231 313.97C88.4581 315.459 83.5201 315.529 83.0311 314.074C82.7723 313.306 83.018 312.966 83.5799 313.313C84.1398 313.659 84.5764 313.384 84.5526 312.703C84.3916 308.249 84.9971 307.097 88.0731 306.006C91.7409 304.706 90.1749 302.466 84.8231 301.359C83.4482 301.075 81.5171 300.405 80.5321 299.87C79.5471 299.334 78.3755 299.121 77.9295 299.397C77.4824 299.673 76.2634 299.261 75.2196 298.481C73.4269 297.14 73.453 297.096 75.7069 297.665C77.4798 298.113 77.9663 297.907 77.6033 296.865C77.3352 296.094 76.3745 295.595 75.4686 295.757C74.5637 295.918 73.8231 295.644 73.8231 295.147C73.8225 293.779 67.1263 286.964 65.7821 286.963C64.5191 286.963 65.3358 292.016 66.7508 292.954C68.0246 293.798 67.6327 300.104 66.3377 299.607C65.6809 299.355 65.2149 300.076 65.2537 301.283C65.3377 303.874 62.3307 304.729 61.4256 302.372C61.0686 301.443 61.4731 299.62 62.3231 298.322C63.7468 296.15 63.7284 295.96 62.0955 295.928C61.1204 295.908 59.1988 295.27 57.826 294.51C56.13 293.571 54.9418 293.449 54.1238 294.128C52.5208 295.458 48.5416 294.139 49.1746 292.487C49.7193 291.067 47.2348 286.963 45.8309 286.963C44.5728 286.963 35.8231 278.847 35.8231 277.681C35.8231 277.1 37.4871 276.973 39.9481 277.367C43.78 277.98 44.0342 277.878 43.5272 275.938C43.0782 274.221 43.2342 274.059 44.4022 275.028C46.6741 276.914 46.0406 274.471 43.7127 272.369C42.5527 271.321 40.7375 268.625 39.6795 266.377C37.9885 262.785 29.7573 256.441 24.5213 254.696C21.1893 253.585 27.5839 242.826 31.0379 243.73C32.8048 244.192 33.0357 243.965 32.4178 242.374C31.1828 239.197 31.2554 238.448 32.7684 238.778C35.0593 239.276 38.8227 236.801 38.8231 234.794C38.8231 233.715 39.5439 232.963 40.5779 232.963C43.0149 232.963 45.0996 226.438 43.1737 224.839C42.4307 224.223 41.8231 222.9 41.8231 221.9C41.823 220.899 41.3729 219.803 40.8231 219.463C40.2731 219.123 39.8231 217.945 39.8231 216.845C39.8231 215.745 39.4205 215.093 38.9295 215.397C38.4384 215.7 37.0855 214.04 35.9237 211.706C34.7617 209.372 33.2645 206.563 32.5965 205.463C31.9285 204.363 30.3573 201.785 29.1033 199.734C26.2513 195.07 26.2154 191.993 28.9774 189.028C30.8989 186.965 30.957 186.618 29.5194 185.813C28.6324 185.316 28.1605 184.245 28.4735 183.431C28.8615 182.419 27.9015 181.476 25.4315 180.444C23.4467 179.615 21.786 178.38 21.741 177.7C21.499 174.063 20.5431 170.143 19.2762 167.585C18.4912 166.003 18.1172 163.64 18.4442 162.335C18.8492 160.724 18.6035 159.943 17.6805 159.9C16.9341 159.865 17.347 159.425 18.5975 158.923C21.2044 157.876 20.8038 153.423 17.911 151.294C13.1591 147.798 12.87 147.403 13.4549 145.213C13.7859 143.975 14.834 142.963 15.785 142.963C16.735 142.963 18.3281 142.063 19.3231 140.963C20.3181 139.863 21.5542 138.963 22.0682 138.963C22.5823 138.963 23.847 137.951 24.8787 136.713C26.4927 134.779 26.7609 134.71 26.7899 136.223C26.8079 137.191 25.9229 138.753 24.8231 139.695C22.2852 141.868 22.305 142.594 24.9237 143.279C26.0795 143.582 26.7278 144.308 26.3651 144.896C26.0023 145.483 25.92 145.963 26.1815 145.963C26.4445 145.963 27.4328 146.261 28.3778 146.623C29.5896 147.087 29.9501 146.866 29.6024 145.873C29.0314 144.244 32.5938 138.703 33.7518 139.419C34.1787 139.683 35.3646 139.287 36.3875 138.54C38.4045 137.065 37.003 133.964 34.3192 133.963C32.9872 133.963 30.2179 125.51 30.7147 122.963C30.8767 122.138 30.9536 119.741 30.8856 117.637C30.7766 114.238 31.1058 113.683 33.8338 112.653C35.9678 111.847 36.8578 110.879 36.7528 109.478C36.4928 106.022 36.7888 104.824 37.7537 105.42C38.2657 105.737 38.9407 105.581 39.2547 105.073C39.5679 104.566 40.6568 104.368 41.6746 104.635C44.2356 105.304 47.2646 102.201 45.7879 100.421C44.9809 99.4493 44.9929 98.5137 45.8309 96.9487C46.4608 95.7707 46.7305 94.1671 46.4305 93.3852C46.0505 92.3923 46.6314 91.9633 48.3543 91.9633C49.712 91.9632 50.8228 91.5132 50.8231 90.9633C50.8231 90.4135 50.3871 89.9636 49.8543 89.9633C49.3224 89.9633 49.1449 89.2882 49.4608 88.4633C49.7917 87.6015 49.481 86.9636 48.7303 86.9633C47.7133 86.9633 47.6899 86.6961 48.6229 85.7631C49.2829 85.1031 49.8231 83.8148 49.8231 82.9008C49.8233 81.6241 51.1422 81.0827 55.5067 80.5698C58.6325 80.2028 61.7825 79.411 62.5067 78.81C64.2735 77.3441 64.1799 74.9637 62.3543 74.9633C61.4603 74.9633 61.1108 75.5493 61.4608 76.4633C61.8237 77.4082 61.4499 77.9633 60.45 77.9633C58.464 77.9633 58.8759 72.1768 60.9559 70.8598C64.4336 68.656 58.1944 70.1802 53.6815 72.6362C50.1078 74.581 48.4698 75.0103 47.6688 74.2094C46.9258 73.4665 45.7561 73.4182 44.0643 74.061C39.8403 75.667 37.8231 74.3507 37.8231 69.9907C37.8233 65.514 41.1635 63.0775 53.0731 58.8667C60.4397 56.2628 60.5863 56.0654 58.1824 51.9956C56.1924 48.6276 56.994 44.361 59.7821 43.476C62.4579 42.6272 68.8174 43.9249 68.8377 45.3237C68.8797 48.4517 70.4558 49.1528 74.6307 47.9028C79.0287 46.5848 80.5395 44.5322 78.7215 42.3422C77.8406 41.2803 78.116 40.538 79.9549 39.018C81.9907 37.3362 82.4786 37.2654 83.4324 38.5122C85.3604 41.0312 100.442 37.019 99.3865 34.269C98.521 32.0121 103.808 29.185 104.979 31.2778C106.381 33.7828 109.101 33.326 112.231 30.059C115.014 27.1544 115.014 27.1541 112.856 24.9965C109.082 21.2226 112.1 14.3884 117.416 14.6713C123.005 14.9683 123.68 15.1663 123.238 16.3803C123.021 16.9763 123.233 18.0729 123.708 18.8178C124.754 20.4597 129.376 17.8723 130.306 15.1245C130.615 14.2105 133.671 11.332 137.096 8.72701C140.516 6.12608 143.361 3.99002 143.424 3.97701ZM208.763 322.963C209.345 322.963 209.823 323.413 209.823 323.963C209.823 324.513 209.625 324.963 209.382 324.963C209.139 324.963 208.663 324.513 208.323 323.963C207.983 323.413 208.182 322.964 208.763 322.963ZM116.823 315.345C116.823 314.52 117.273 314.123 117.823 314.463C118.373 314.803 118.823 315.757 118.823 316.582C118.823 317.406 118.373 317.803 117.823 317.463C117.273 317.123 116.823 316.17 116.823 315.345ZM202.323 313.963C202.598 313.963 202.823 314.188 202.823 314.463C202.823 314.738 202.598 314.963 202.323 314.963C202.048 314.963 201.823 314.738 201.823 314.463C201.823 314.188 202.048 313.963 202.323 313.963ZM74.7635 305.963C75.3455 305.963 75.8231 306.413 75.8231 306.963C75.823 307.513 75.6246 307.963 75.3817 307.963C75.1386 307.963 74.6629 307.513 74.3231 306.963C73.9831 306.413 74.1818 305.964 74.7635 305.963ZM71.8231 304.963C72.373 304.963 72.8231 305.413 72.8231 305.963C72.823 306.513 72.3729 306.963 71.8231 306.963C71.2731 306.963 70.8232 306.513 70.8231 305.963C70.8231 305.413 71.2731 304.963 71.8231 304.963ZM131.823 306.07C131.823 304.426 129.038 304.086 127.17 305.5C125.465 306.792 125.573 306.902 128.573 306.931C130.36 306.949 131.823 306.561 131.823 306.07ZM86.8231 303.963C87.5559 303.963 87.856 304.263 87.4901 304.63C87.1231 304.996 86.5231 304.996 86.1561 304.63C85.7901 304.263 86.0901 303.963 86.8231 303.963ZM77.2401 304.042C78.294 303.999 78.8836 304.235 78.5516 304.567C78.2196 304.899 77.3566 304.935 76.6356 304.646C75.838 304.327 76.0752 304.09 77.2401 304.042ZM78.8231 300.963C79.373 300.963 79.8231 301.413 79.8231 301.963C79.823 302.513 79.3729 302.963 78.8231 302.963C78.2731 302.963 77.8232 302.513 77.8231 301.963C77.8231 301.413 78.2731 300.963 78.8231 300.963ZM70.3231 299.963C71.148 299.963 71.8231 300.624 71.8231 301.432C71.8231 302.326 71.2371 302.675 70.3231 302.325C69.4981 302.008 68.8231 301.347 68.8231 300.856C68.8233 300.365 69.4982 299.963 70.3231 299.963ZM69.8231 291.963C70.3727 291.963 70.8226 292.161 70.8231 292.404C70.8231 292.647 70.3731 293.123 69.8231 293.463C69.2731 293.803 68.8231 293.604 68.8231 293.022C68.8232 292.44 69.2731 291.963 69.8231 291.963ZM270.323 285.963C271.148 285.963 271.823 286.133 271.823 286.341C271.823 286.548 271.148 287.279 270.323 287.963C269.094 288.983 268.823 288.914 268.823 287.585C268.823 286.693 269.498 285.963 270.323 285.963ZM275.323 284.963C275.598 284.963 275.823 285.188 275.823 285.463C275.823 285.738 275.598 285.963 275.323 285.963C275.048 285.963 274.823 285.738 274.823 285.463C274.823 285.188 275.048 284.963 275.323 284.963ZM273.515 281.322C274.055 279.913 274.222 279.924 275.064 281.429C276.122 283.319 275.489 284.493 273.932 283.531C273.371 283.182 273.183 282.189 273.515 281.322ZM269.981 280.963C269.981 279.588 270.208 279.026 270.485 279.713C270.763 280.401 270.763 281.526 270.485 282.213C270.208 282.901 269.981 282.338 269.981 280.963ZM272.323 279.963C272.598 279.963 272.823 280.188 272.823 280.463C272.823 280.738 272.598 280.963 272.323 280.963C272.048 280.963 271.823 280.738 271.823 280.463C271.823 280.188 272.048 279.963 272.323 279.963ZM266.479 278.508C266.109 277.545 266.407 277.251 267.374 277.622C269.054 278.267 269.168 278.632 267.928 279.398C267.435 279.703 266.783 279.302 266.479 278.508ZM273.323 277.963C273.598 277.963 273.823 278.188 273.823 278.463C273.823 278.738 273.598 278.963 273.323 278.963C273.048 278.963 272.823 278.738 272.823 278.463C272.823 278.188 273.048 277.963 273.323 277.963ZM312.823 274.963C312.823 274.23 313.123 273.93 313.49 274.296C313.856 274.663 313.856 275.263 313.49 275.63C313.123 275.996 312.823 275.696 312.823 274.963ZM306.823 264.522C306.823 262.765 307.423 262.507 308.28 263.894C308.597 264.406 308.398 265.108 307.839 265.454C307.28 265.798 306.823 265.379 306.823 264.522ZM39.241 257.57C36.868 256.659 36.5506 256.812 37.2156 258.545C37.5496 259.415 37.8231 260.315 37.8231 260.545C37.8235 260.775 38.4984 260.963 39.3231 260.963C41.3139 260.963 41.251 258.341 39.241 257.57ZM294.721 251.963C296.379 251.963 302.87 258.076 302.261 259.064C300.769 261.477 295.519 258.26 294.343 254.213C293.964 252.911 294.123 251.964 294.721 251.963ZM274.323 255.963C274.048 255.963 273.823 256.188 273.823 256.463C273.823 256.738 274.048 256.963 274.323 256.963C274.598 256.963 274.823 256.738 274.823 256.463C274.823 256.188 274.598 255.963 274.323 255.963ZM268.323 252.963C268.048 252.963 267.823 253.188 267.823 253.463C267.823 253.738 268.048 253.963 268.323 253.963C268.598 253.963 268.823 253.738 268.823 253.463C268.823 253.188 268.598 252.963 268.323 252.963ZM266.646 249.296C266.257 247.287 264.26 246.448 263.356 247.911C262.476 249.334 263.598 250.963 265.455 250.963C266.331 250.963 266.833 250.26 266.646 249.296ZM269.323 249.963C269.048 249.963 268.823 250.188 268.823 250.463C268.823 250.738 269.048 250.963 269.323 250.963C269.598 250.963 269.823 250.738 269.823 250.463C269.823 250.188 269.598 249.963 269.323 249.963ZM24.3231 232.963C24.598 232.963 24.8231 233.188 24.8231 233.463C24.823 233.738 24.5979 233.963 24.3231 233.963C24.0481 233.963 23.8232 233.738 23.8231 233.463C23.8231 233.188 24.0481 232.963 24.3231 232.963ZM26.3231 232.963C26.598 232.963 26.8231 233.188 26.8231 233.463C26.823 233.738 26.5979 233.963 26.3231 233.963C26.0481 233.963 25.8232 233.738 25.8231 233.463C25.8231 233.188 26.0481 232.963 26.3231 232.963ZM30.3231 182.963C30.0481 182.963 29.8231 183.188 29.8231 183.463C29.8232 183.738 30.0481 183.963 30.3231 183.963C30.5979 183.963 30.823 183.738 30.8231 183.463C30.8231 183.188 30.598 182.963 30.3231 182.963ZM25.8231 182.963C26.5559 182.963 26.856 183.263 26.4901 183.63C26.1231 183.996 25.5231 183.996 25.1561 183.63C24.7901 183.263 25.0901 182.963 25.8231 182.963ZM24.5418 168.045C24.7068 165.852 23.3077 164.369 22.4237 165.799C22.1289 166.277 22.4496 167.439 23.1375 168.378C24.2905 169.956 24.3998 169.93 24.5418 168.045ZM26.3231 165.963C26.0481 165.963 25.8231 166.188 25.8231 166.463C25.8232 166.738 26.0481 166.963 26.3231 166.963C26.5979 166.963 26.823 166.738 26.8231 166.463C26.8231 166.188 26.598 165.963 26.3231 165.963ZM278.023 154.164C281.374 150.813 285.386 154.145 284.39 159.453C283.619 163.564 281.534 164.032 278.766 160.713C276.583 158.097 276.33 155.857 278.023 154.164ZM0.823065 156.963C1.55594 156.963 1.85603 157.263 1.49006 157.63C1.12312 157.996 0.523086 157.996 0.156073 157.63C-0.209927 157.263 0.0900652 156.963 0.823065 156.963ZM286.917 147.963C287.415 147.963 287.823 148.863 287.823 149.963C287.823 151.063 287.65 151.962 287.44 151.963C287.229 151.963 286.821 151.063 286.533 149.963C286.246 148.863 286.418 147.963 286.917 147.963ZM285.323 145.963C285.598 145.963 285.823 146.188 285.823 146.463C285.823 146.738 285.598 146.963 285.323 146.963C285.048 146.963 284.823 146.738 284.823 146.463C284.823 146.188 285.048 145.963 285.323 145.963ZM293.205 142.963C293.48 142.963 293.983 143.413 294.323 143.963C294.663 144.513 294.716 144.963 294.441 144.963C294.166 144.963 293.663 144.513 293.323 143.963C292.983 143.413 292.93 142.963 293.205 142.963ZM18.6795 133.08C18.8755 133.016 18.7986 133.583 18.5076 134.341C18.2168 135.099 18.5072 136.25 19.1512 136.898C20.0502 137.802 19.7528 137.866 17.8738 137.174C14.8158 136.047 14.1344 134.282 16.5184 133.664C17.5105 133.407 18.4825 133.144 18.6795 133.08ZM27.4901 131.63C28.6061 130.513 29.4901 130.881 29.4901 132.463C29.49 133.288 28.8899 133.963 28.1561 133.963C26.7371 133.963 26.3861 132.734 27.4901 131.63ZM293.763 131.963C294.345 131.963 294.823 132.413 294.823 132.963C294.823 133.513 294.625 133.963 294.382 133.963C294.139 133.963 293.663 133.513 293.323 132.963C292.983 132.413 293.182 131.964 293.763 131.963ZM296.323 132.963C296.598 132.963 296.823 133.188 296.823 133.463C296.823 133.738 296.598 133.963 296.323 133.963C296.048 133.963 295.823 133.738 295.823 133.463C295.823 133.188 296.048 132.963 296.323 132.963ZM20.8231 128.963C21.373 128.963 21.8231 129.638 21.8231 130.463C21.823 131.288 21.3729 131.963 20.8231 131.963C20.2731 131.963 19.8231 131.288 19.8231 130.463C19.8231 129.638 20.2731 128.963 20.8231 128.963ZM302.823 129.091C306.081 127.786 307.823 127.729 307.823 128.928C307.823 130.677 303.932 132.124 302.06 131.07C300.503 130.194 300.582 129.989 302.823 129.091ZM14.3885 125.861C17.5155 124.636 18.4666 124.918 16.4256 126.463C15.3817 127.253 14.062 127.611 13.492 127.258C12.8941 126.889 13.2737 126.298 14.3885 125.861ZM290.882 124.963C291.4 124.963 291.823 125.413 291.823 125.963C291.823 126.513 291.12 126.963 290.263 126.963C289.407 126.963 288.983 126.513 289.323 125.963C289.663 125.413 290.364 124.963 290.882 124.963ZM253.323 104.963C253.048 104.963 252.823 105.188 252.823 105.463C252.823 105.738 253.048 105.963 253.323 105.963C253.598 105.963 253.823 105.738 253.823 105.463C253.823 105.188 253.598 104.963 253.323 104.963ZM38.3231 101.963C38.598 101.963 38.8231 102.188 38.8231 102.463C38.823 102.738 38.5979 102.963 38.3231 102.963C38.0481 102.963 37.8232 102.738 37.8231 102.463C37.8231 102.188 38.0481 101.963 38.3231 101.963ZM43.3231 100.963C43.598 100.963 43.8231 101.188 43.8231 101.463C43.823 101.738 43.5979 101.963 43.3231 101.963C43.0481 101.963 42.8232 101.738 42.8231 101.463C42.8231 101.188 43.0481 100.963 43.3231 100.963ZM32.0731 95.9458C33.86 94.8529 35.9221 94.1854 36.6551 94.4614C37.3872 94.7374 38.7372 94.9995 39.6551 95.0424C40.6539 95.0895 40.8314 95.3207 40.0975 95.6176C39.4238 95.8904 38.6452 95.9673 38.367 95.7885C38.089 95.6095 37.152 96.4753 36.286 97.7133C35.258 99.1803 33.6844 99.9633 31.7654 99.9633C27.9139 99.9632 28.0332 98.4167 32.0731 95.9458ZM260.323 98.9633C260.598 98.9634 260.823 99.1884 260.823 99.4633C260.823 99.7382 260.598 99.9632 260.323 99.9633C260.048 99.9633 259.823 99.7383 259.823 99.4633C259.823 99.1883 260.048 98.9633 260.323 98.9633ZM42.3231 97.9633C42.598 97.9634 42.8231 98.1884 42.8231 98.4633C42.823 98.7382 42.5979 98.9632 42.3231 98.9633C42.0481 98.9633 41.8232 98.7383 41.8231 98.4633C41.8231 98.1883 42.0481 97.9633 42.3231 97.9633ZM54.6434 89.7915C54.2964 87.4396 52.372 86.2652 51.411 87.8198C50.504 89.2878 51.8519 91.9633 53.4998 91.9633C54.4317 91.9633 54.8462 91.1762 54.6434 89.7915ZM239.323 74.9633C239.598 74.9634 239.823 75.1884 239.823 75.4633C239.823 75.7382 239.598 75.9632 239.323 75.9633C239.048 75.9633 238.823 75.7383 238.823 75.4633C238.823 75.1883 239.048 74.9633 239.323 74.9633ZM273.823 72.9594C273.823 72.4464 274.498 72.2376 275.323 72.4946C276.148 72.7526 277.573 73.2036 278.49 73.4965C279.664 73.8715 279.843 74.3424 279.097 75.0883C277.917 76.2677 273.824 74.6152 273.823 72.9594ZM69.8074 71.2133C69.8294 69.4163 68.1488 69.6726 67.4178 71.5766C67.0247 72.6002 66.0719 73.0001 64.8113 72.6704C63.7187 72.3845 62.8236 72.5091 62.8231 72.9477C62.8231 73.3867 64.0183 74.0465 65.4783 74.4135C68.145 75.0822 69.7744 73.878 69.8074 71.2133ZM244.382 68.9633C244.139 68.9636 243.663 69.4135 243.323 69.9633C242.983 70.5132 243.182 70.9631 243.763 70.9633C244.345 70.9633 244.823 70.5133 244.823 69.9633C244.823 69.4133 244.625 68.9633 244.382 68.9633ZM241.323 67.9633C241.048 67.9633 240.823 68.1883 240.823 68.4633C240.823 68.7383 241.048 68.9633 241.323 68.9633C241.598 68.9632 241.823 68.7382 241.823 68.4633C241.823 68.1884 241.598 67.9634 241.323 67.9633ZM144.24 46.0424C143.075 46.0904 142.838 46.327 143.636 46.646C144.357 46.935 145.22 46.8988 145.552 46.5669C145.884 46.2349 145.294 45.9995 144.24 46.0424ZM181.823 43.9633C181.09 43.9633 180.79 44.2633 181.156 44.6303C181.523 44.9962 182.123 44.9963 182.49 44.6303C182.856 44.2634 182.556 43.9634 181.823 43.9633ZM147.345 34.3335C146.209 33.8976 145.532 34.3585 145.147 35.8335C144.84 37.0054 143.967 37.9633 143.206 37.9633C142.446 37.9633 141.823 38.4133 141.823 38.9633C141.823 40.4821 144.417 40.1582 145.823 38.4633C146.508 37.6384 148.111 36.9635 149.386 36.9633C150.661 36.9633 151.983 36.5133 152.323 35.9633C152.663 35.4133 152.051 34.9633 150.964 34.9633C149.876 34.9633 148.247 34.6804 147.345 34.3335ZM138.947 36.6958C137.959 35.7159 137.845 35.8314 138.387 37.2563C138.763 38.2423 139.322 38.7967 139.63 38.4887C139.938 38.1817 139.631 37.3747 138.947 36.6958ZM160.323 29.9633C160.598 29.9634 160.823 30.1884 160.823 30.4633C160.823 30.7382 160.598 30.9632 160.323 30.9633C160.048 30.9633 159.823 30.7382 159.823 30.4633C159.823 30.1883 160.048 29.9633 160.323 29.9633ZM205.823 28.9633C206.556 28.9634 206.856 29.2634 206.49 29.6303C206.123 29.9963 205.523 29.9961 205.156 29.6303C204.79 29.2633 205.09 28.9633 205.823 28.9633ZM210.823 24.9633C211.373 24.9634 211.823 25.161 211.823 25.4038C211.823 25.6468 211.373 26.1233 210.823 26.4633C210.273 26.8033 209.823 26.6039 209.823 26.0219C209.823 25.44 210.273 24.9633 210.823 24.9633ZM176.323 24.9633C176.598 24.9634 176.823 25.1884 176.823 25.4633C176.823 25.7382 176.598 25.9632 176.323 25.9633C176.048 25.9633 175.823 25.7382 175.823 25.4633C175.823 25.1883 176.048 24.9633 176.323 24.9633ZM172.823 18.9633C173.556 18.9634 173.856 19.2634 173.49 19.6303C173.123 19.9963 172.523 19.9961 172.156 19.6303C171.79 19.2633 172.09 18.9633 172.823 18.9633ZM173.823 15.9633C173.823 15.2303 174.123 14.9303 174.49 15.2963C174.856 15.6634 174.856 16.2634 174.49 16.6303C174.123 16.9963 173.823 16.6962 173.823 15.9633ZM208.823 13.9633C209.556 13.9634 209.856 14.2634 209.49 14.6303C209.123 14.9963 208.523 14.9962 208.156 14.6303C207.79 14.2633 208.09 13.9633 208.823 13.9633ZM177.323 12.9633C177.598 12.9634 177.823 13.1884 177.823 13.4633C177.823 13.7382 177.598 13.9632 177.323 13.9633C177.048 13.9633 176.823 13.7382 176.823 13.4633C176.823 13.1883 177.048 12.9633 177.323 12.9633ZM166.323 10.9633C166.598 10.9634 166.823 11.1884 166.823 11.4633C166.823 11.7382 166.598 11.9632 166.323 11.9633C166.048 11.9633 165.823 11.7382 165.823 11.4633C165.823 11.1883 166.048 10.9633 166.323 10.9633ZM175.823 10.9633C175.823 10.2303 176.123 9.93035 176.49 10.2963C176.856 10.6634 176.856 11.2634 176.49 11.6303C176.123 11.9963 175.823 11.6962 175.823 10.9633ZM171.323 9.96334C171.598 9.96343 171.823 10.1884 171.823 10.4633C171.823 10.7382 171.598 10.9632 171.323 10.9633C171.048 10.9633 170.823 10.7382 170.823 10.4633C170.823 10.1883 171.048 9.96334 171.323 9.96334ZM132.382 6.96334C132.625 6.96334 132.823 7.41334 132.823 7.96334C132.823 8.51325 132.345 8.96334 131.763 8.96334C131.182 8.96314 130.983 8.51318 131.323 7.96334C131.663 7.41353 132.139 6.96364 132.382 6.96334ZM122.823 7.96334C123.556 7.96339 123.856 8.26336 123.49 8.63033C123.123 8.99625 122.523 8.99614 122.156 8.63033C121.79 8.26333 122.09 7.96334 122.823 7.96334ZM167.204 2.311C170.133 -0.207938 172.823 -0.770742 172.823 1.13424C172.823 2.86018 169.742 5.96305 168.028 5.96334C167.212 5.96334 166.002 6.70389 165.34 7.60885C164.278 9.06077 164.156 8.98412 164.305 6.95846C164.398 5.69446 165.703 3.603 167.204 2.311Z"
              className={STROKE[period]}
            />
          </g>
          <path
            id="stroke0_1_4_ref"
            d="M397.822 19.5C345.452 31.6352 276.662 39 201.322 39C125.981 39 57.1915 31.6353 4.82178 19.5V18H397.822V19.5Z"
          />
          <g
            id="stroke1_1_4"
            data-figma-scatter-ref="stroke1_1_4_ref"
            data-figma-scatter="f0.51_w0.06_aj180_sj0.65_r0_s0_sw5"
          >
            <path
              d="M215.823 333.963C215.823 333.23 216.123 332.93 216.49 333.296C216.856 333.663 216.856 334.263 216.49 334.63C216.123 334.996 215.823 334.696 215.823 333.963ZM143.424 3.97701C148.056 3.32404 151.523 8.80284 148.726 12.3588C146.775 14.8388 146.175 17.9633 147.648 17.9633C148.553 17.9667 158.823 30.3033 158.823 31.3862C158.823 32.4623 154.479 36.4974 152.507 37.2544C150.609 37.9824 151.073 39.9631 153.14 39.9633C153.801 39.9633 154.92 40.8881 155.626 42.02C156.91 44.0739 156.912 44.0744 158.617 42.0766C159.555 40.9766 161.223 39.938 162.323 39.77C163.423 39.601 164.653 39.0132 165.057 38.4633C165.472 37.8983 165.798 38.2253 165.807 39.2133C165.825 41.3531 166.254 41.3818 169.215 39.4419C170.838 38.3789 171.405 37.2303 171.099 35.6313C170.05 30.1434 175.963 30.1199 185.501 35.5737C190.79 38.5976 191.028 38.5792 193.164 34.9633C196.187 29.8454 203.13 33.2701 201.316 38.9838C200.801 40.6068 201.133 41.2309 202.733 41.6499C203.883 41.9499 204.823 42.5946 204.823 43.0805C204.824 43.5654 205.723 43.9633 206.823 43.9633C209.228 43.9633 209.333 43.3299 207.269 41.2661C205.332 39.3301 205.758 35.0191 208.025 33.5991C210.469 32.0694 211.11 33.2632 210.001 37.2797C209.157 40.3355 209.276 40.8478 210.928 41.2797C211.97 41.5527 212.823 42.4936 212.823 43.3696C212.824 45.4861 216.745 45.4516 218.302 43.3227C219.936 41.0879 223.264 42.9574 223.298 46.1294C223.32 48.1552 223.883 48.504 227.573 48.77C231.476 49.053 231.823 48.8831 231.823 46.6811C231.823 45.0832 232.672 43.8975 234.37 43.1245C240.164 40.4845 243.457 43.0685 242.282 49.3315C241.655 52.6722 241.655 52.6725 249.407 53.3745C262.73 54.5825 271.108 62.5852 260.323 63.8012C258.673 63.9882 256.79 64.5797 256.14 65.1167C255.368 65.7556 253.636 65.7276 251.14 65.0346C246.476 63.7398 245.823 63.7172 245.823 64.8549C245.823 65.7449 249.37 66.9616 253.515 67.4936C257.329 67.9826 258.042 68.9656 257.379 72.8286C255.795 82.0527 255.841 81.9633 252.685 81.9633C250.953 81.9633 249.964 81.5443 250.323 80.9633C250.663 80.4133 250.517 79.9633 249.999 79.9633C249.48 79.9633 248.821 79.0632 248.533 77.9633C248.217 76.7553 247.169 75.9633 245.885 75.9633C244.716 75.9632 243.46 75.1762 243.092 74.2133C242.404 72.4103 242.246 72.1833 238.753 67.9633C236.684 65.4633 236.684 65.4633 237.262 68.1733C237.705 70.252 237.359 71.1408 235.772 71.9897C232.719 73.6237 233.414 78.5898 236.633 78.1401C237.903 77.9621 239.585 78.3504 240.37 79.0024C241.211 79.7003 242.9 79.9101 244.485 79.5122C246.95 78.8932 247.055 78.9823 245.748 80.5922C244.844 81.7052 244.78 82.0721 245.573 81.5962C246.78 80.8713 247.26 82.2792 247.055 85.9321C247.01 86.7401 248.281 89.181 249.881 91.3569C252.292 94.6349 252.689 95.9524 252.194 99.0434C251.695 102.167 251.943 102.958 253.722 103.911C255.46 104.841 255.656 105.407 254.789 107.026C254.207 108.114 254.046 109.515 254.431 110.14C255.79 112.339 247.804 110.139 243.089 107.016C234.391 101.254 232.358 104.203 234.165 119.963C234.386 121.888 234.142 123.998 233.622 124.653C231.331 127.54 233.14 131.457 236.823 131.585C238.748 131.652 240.773 131.816 241.323 131.95C241.873 132.084 243.093 132.116 244.034 132.022C246.328 131.792 249.862 133.758 249.563 135.098C249.134 137.018 257.14 136.437 263.279 134.102C266.554 132.856 270.042 132.048 271.029 132.307C272.126 132.594 272.823 132.23 272.823 131.37C272.823 130.597 271.923 129.963 270.823 129.963C268.355 129.963 268.291 128.842 270.596 125.996C272.37 123.806 272.37 123.805 274.251 125.884C277.35 129.307 282.41 126.734 280.041 122.94C279.048 121.351 279.46 120.899 283.362 119.295C285.811 118.288 287.817 117.126 287.819 116.713C287.821 116.301 288.262 115.963 288.798 115.963C290.086 115.963 288.981 121.818 287.134 124.78C286.042 126.531 285.967 127.431 286.825 128.466C288.108 130.011 286.599 133.834 284.133 135.288C283.329 135.762 282.984 136.896 283.321 137.957C283.727 139.236 283.296 139.996 281.916 140.434C280.723 140.812 280.144 141.636 280.471 142.488C281.07 144.051 279.303 146.204 276.573 147.238C275.611 147.602 274.823 148.857 274.823 150.027C274.823 152.253 271.493 157.622 268.86 159.642C267.494 160.689 267.518 160.896 269.075 161.499C270.259 161.958 271.465 161.413 272.792 159.821C274.896 157.295 275.458 157.908 273.83 160.952C272.986 162.526 273.289 162.906 275.83 163.464C279.699 164.314 279.894 168.296 276.323 173.558C272.999 178.456 273.141 179.594 277.811 185.463C279.999 188.213 283.258 192.592 285.055 195.195C287.985 199.439 291.823 201.575 291.823 198.963C291.823 198.413 292.858 197.963 294.123 197.963C295.388 197.963 296.869 197.517 297.413 196.973C298.033 196.353 299.563 196.316 301.501 196.872C303.893 197.558 304.97 197.388 306.229 196.128C311.032 191.326 313.154 199.168 308.775 205.533C305.051 210.945 307.295 210.388 312.57 204.592C314.356 202.629 316.421 201.256 317.16 201.54C317.898 201.822 319.08 201.359 319.785 200.509C321.719 198.179 324.72 198.643 326.009 201.472C327.592 204.947 325.832 207.908 318.196 214.612C312.035 220.021 312.035 220.021 314.929 222.915C319.416 227.402 318.437 230.291 311.993 231.58C309.623 232.053 308.701 231.81 308.231 230.585C307.343 228.271 305.535 228.576 302.783 231.505C300.746 233.674 300.577 234.339 301.632 236.028C303.496 239.014 301.66 241.738 298.126 241.228C293.529 240.565 288.418 246.501 289.907 250.775C290.518 252.528 291.537 253.977 292.171 253.994C292.805 254.011 292.532 254.484 291.565 255.048C290.598 255.611 289.399 255.819 288.9 255.511C288.402 255.203 287.764 255.415 287.483 255.982C287.203 256.549 287.108 256.439 287.273 255.738C287.438 255.037 288.155 254.601 288.867 254.769C289.918 255.018 289.921 254.787 288.886 253.54C288.066 252.551 286.49 252.15 284.467 252.416C282.738 252.642 279.973 252.894 278.323 252.974C276.673 253.055 275.886 253.348 276.573 253.625C277.261 253.904 277.823 254.712 277.823 255.424C277.823 256.136 278.498 257.278 279.323 257.963C284.43 262.201 279.156 267.527 267.467 269.94C261.662 271.138 261.616 271.176 262.217 274.181C262.55 275.849 262.823 278.291 262.823 279.609C262.823 281.174 263.663 282.389 265.244 283.109C266.671 283.759 267.448 284.778 267.136 285.59C265.821 289.017 267.765 292.135 270.801 291.468C274.766 290.597 278.421 292.537 276.707 294.602C276.023 295.427 274.625 295.883 273.602 295.615C272.138 295.233 271.87 295.538 272.348 297.046C272.893 298.763 272.429 298.963 267.889 298.963C262.743 298.963 261.095 297.073 265.249 295.935C268.036 295.172 268.4 292.927 265.844 292.258C264.392 291.879 264.055 291.437 264.845 290.949C266.469 289.946 265.098 283.964 263.244 283.963C262.462 283.963 261.823 283.571 261.823 283.091C261.823 282.611 259.972 281.923 257.709 281.561C255.433 281.197 252.864 280.005 251.959 278.892C250.396 276.971 250.314 277.128 250.111 282.423C249.912 287.635 250.039 287.963 252.254 287.963C257.861 287.963 255.961 295.527 250.118 296.465C248.031 296.8 244.838 297.728 243.022 298.527C240.536 299.621 239.219 299.71 237.687 298.89C235.32 297.624 234.327 298.227 235.168 300.42C235.494 301.269 236.844 301.963 238.169 301.963C242.073 301.963 243.244 304.249 241.284 308.04C239.619 311.258 239.618 311.258 228.221 310.647C216.823 310.036 216.823 310.036 216.823 313.065C216.823 321.686 206.244 322.014 203.987 313.463C202.962 309.577 196.547 308.889 196.016 312.607C195.599 315.535 190.787 316.541 190.083 313.848C189.539 311.771 188.717 311.487 187.273 312.878C186.751 313.382 185.198 313.944 183.823 314.128C182.113 314.357 181.221 315.181 181 316.737C180.739 318.581 180.17 318.937 178 318.615C176.528 318.397 175.418 317.764 175.533 317.21C175.649 316.655 174.861 315.403 173.783 314.427C171.902 312.724 171.821 312.729 171.781 314.558C171.757 315.606 170.365 317.588 168.686 318.963C167.007 320.338 164.438 322.475 162.978 323.712C158.062 327.876 154.556 326.427 153.301 319.713C152.916 317.652 152.42 315.964 152.199 315.963C151.978 315.963 148.55 316.863 144.58 317.963C130.056 321.988 115.58 315.43 128.81 310.818C130.467 310.24 131.823 309.373 131.823 308.89C131.823 308.407 130.668 308.452 129.257 308.988C127.134 309.795 126.098 309.512 123.257 307.345C120.118 304.951 118.274 301.888 120.978 303.558C121.694 304.001 121.861 303.833 121.417 303.115C120.368 301.418 116.504 303.691 117.229 305.579C118.04 307.692 114.948 308.516 113.522 306.566C111.691 304.062 106.546 306.574 107.286 309.61C108.627 315.112 101.84 317.769 99.8455 312.524C98.8953 310.026 94.4089 310.708 90.3231 313.97C88.4581 315.459 83.5201 315.529 83.0311 314.074C82.7723 313.306 83.018 312.966 83.5799 313.313C84.1398 313.659 84.5764 313.384 84.5526 312.703C84.3916 308.249 84.9971 307.097 88.0731 306.006C91.7409 304.706 90.1749 302.466 84.8231 301.359C83.4482 301.075 81.5171 300.405 80.5321 299.87C79.5471 299.334 78.3755 299.121 77.9295 299.397C77.4824 299.673 76.2634 299.261 75.2196 298.481C73.4269 297.14 73.453 297.096 75.7069 297.665C77.4798 298.113 77.9663 297.907 77.6033 296.865C77.3352 296.094 76.3745 295.595 75.4686 295.757C74.5637 295.918 73.8231 295.644 73.8231 295.147C73.8225 293.779 67.1263 286.964 65.7821 286.963C64.5191 286.963 65.3358 292.016 66.7508 292.954C68.0246 293.798 67.6327 300.104 66.3377 299.607C65.6809 299.355 65.2149 300.076 65.2537 301.283C65.3377 303.874 62.3307 304.729 61.4256 302.372C61.0686 301.443 61.4731 299.62 62.3231 298.322C63.7468 296.15 63.7284 295.96 62.0955 295.928C61.1204 295.908 59.1988 295.27 57.826 294.51C56.13 293.571 54.9418 293.449 54.1238 294.128C52.5208 295.458 48.5416 294.139 49.1746 292.487C49.7193 291.067 47.2348 286.963 45.8309 286.963C44.5728 286.963 35.8231 278.847 35.8231 277.681C35.8231 277.1 37.4871 276.973 39.9481 277.367C43.78 277.98 44.0342 277.878 43.5272 275.938C43.0782 274.221 43.2342 274.059 44.4022 275.028C46.6741 276.914 46.0406 274.471 43.7127 272.369C42.5527 271.321 40.7375 268.625 39.6795 266.377C37.9885 262.785 29.7573 256.441 24.5213 254.696C21.1893 253.585 27.5839 242.826 31.0379 243.73C32.8048 244.192 33.0357 243.965 32.4178 242.374C31.1828 239.197 31.2554 238.448 32.7684 238.778C35.0593 239.276 38.8227 236.801 38.8231 234.794C38.8231 233.715 39.5439 232.963 40.5779 232.963C43.0149 232.963 45.0996 226.438 43.1737 224.839C42.4307 224.223 41.8231 222.9 41.8231 221.9C41.823 220.899 41.3729 219.803 40.8231 219.463C40.2731 219.123 39.8231 217.945 39.8231 216.845C39.8231 215.745 39.4205 215.093 38.9295 215.397C38.4384 215.7 37.0855 214.04 35.9237 211.706C34.7617 209.372 33.2645 206.563 32.5965 205.463C31.9285 204.363 30.3573 201.785 29.1033 199.734C26.2513 195.07 26.2154 191.993 28.9774 189.028C30.8989 186.965 30.957 186.618 29.5194 185.813C28.6324 185.316 28.1605 184.245 28.4735 183.431C28.8615 182.419 27.9015 181.476 25.4315 180.444C23.4467 179.615 21.786 178.38 21.741 177.7C21.499 174.063 20.5431 170.143 19.2762 167.585C18.4912 166.003 18.1172 163.64 18.4442 162.335C18.8492 160.724 18.6035 159.943 17.6805 159.9C16.9341 159.865 17.347 159.425 18.5975 158.923C21.2044 157.876 20.8038 153.423 17.911 151.294C13.1591 147.798 12.87 147.403 13.4549 145.213C13.7859 143.975 14.834 142.963 15.785 142.963C16.735 142.963 18.3281 142.063 19.3231 140.963C20.3181 139.863 21.5542 138.963 22.0682 138.963C22.5823 138.963 23.847 137.951 24.8787 136.713C26.4927 134.779 26.7609 134.71 26.7899 136.223C26.8079 137.191 25.9229 138.753 24.8231 139.695C22.2852 141.868 22.305 142.594 24.9237 143.279C26.0795 143.582 26.7278 144.308 26.3651 144.896C26.0023 145.483 25.92 145.963 26.1815 145.963C26.4445 145.963 27.4328 146.261 28.3778 146.623C29.5896 147.087 29.9501 146.866 29.6024 145.873C29.0314 144.244 32.5938 138.703 33.7518 139.419C34.1787 139.683 35.3646 139.287 36.3875 138.54C38.4045 137.065 37.003 133.964 34.3192 133.963C32.9872 133.963 30.2179 125.51 30.7147 122.963C30.8767 122.138 30.9536 119.741 30.8856 117.637C30.7766 114.238 31.1058 113.683 33.8338 112.653C35.9678 111.847 36.8578 110.879 36.7528 109.478C36.4928 106.022 36.7888 104.824 37.7537 105.42C38.2657 105.737 38.9407 105.581 39.2547 105.073C39.5679 104.566 40.6568 104.368 41.6746 104.635C44.2356 105.304 47.2646 102.201 45.7879 100.421C44.9809 99.4493 44.9929 98.5137 45.8309 96.9487C46.4608 95.7707 46.7305 94.1671 46.4305 93.3852C46.0505 92.3923 46.6314 91.9633 48.3543 91.9633C49.712 91.9632 50.8228 91.5132 50.8231 90.9633C50.8231 90.4135 50.3871 89.9636 49.8543 89.9633C49.3224 89.9633 49.1449 89.2882 49.4608 88.4633C49.7917 87.6015 49.481 86.9636 48.7303 86.9633C47.7133 86.9633 47.6899 86.6961 48.6229 85.7631C49.2829 85.1031 49.8231 83.8148 49.8231 82.9008C49.8233 81.6241 51.1422 81.0827 55.5067 80.5698C58.6325 80.2028 61.7825 79.411 62.5067 78.81C64.2735 77.3441 64.1799 74.9637 62.3543 74.9633C61.4603 74.9633 61.1108 75.5493 61.4608 76.4633C61.8237 77.4082 61.4499 77.9633 60.45 77.9633C58.464 77.9633 58.8759 72.1768 60.9559 70.8598C64.4336 68.656 58.1944 70.1802 53.6815 72.6362C50.1078 74.581 48.4698 75.0103 47.6688 74.2094C46.9258 73.4665 45.7561 73.4182 44.0643 74.061C39.8403 75.667 37.8231 74.3507 37.8231 69.9907C37.8233 65.514 41.1635 63.0775 53.0731 58.8667C60.4397 56.2628 60.5863 56.0654 58.1824 51.9956C56.1924 48.6276 56.994 44.361 59.7821 43.476C62.4579 42.6272 68.8174 43.9249 68.8377 45.3237C68.8797 48.4517 70.4558 49.1528 74.6307 47.9028C79.0287 46.5848 80.5395 44.5322 78.7215 42.3422C77.8406 41.2803 78.116 40.538 79.9549 39.018C81.9907 37.3362 82.4786 37.2654 83.4324 38.5122C85.3604 41.0312 100.442 37.019 99.3865 34.269C98.521 32.0121 103.808 29.185 104.979 31.2778C106.381 33.7828 109.101 33.326 112.231 30.059C115.014 27.1544 115.014 27.1541 112.856 24.9965C109.082 21.2226 112.1 14.3884 117.416 14.6713C123.005 14.9683 123.68 15.1663 123.238 16.3803C123.021 16.9763 123.233 18.0729 123.708 18.8178C124.754 20.4597 129.376 17.8723 130.306 15.1245C130.615 14.2105 133.671 11.332 137.096 8.72701C140.516 6.12608 143.361 3.99002 143.424 3.97701ZM208.763 322.963C209.345 322.963 209.823 323.413 209.823 323.963C209.823 324.513 209.625 324.963 209.382 324.963C209.139 324.963 208.663 324.513 208.323 323.963C207.983 323.413 208.182 322.964 208.763 322.963ZM116.823 315.345C116.823 314.52 117.273 314.123 117.823 314.463C118.373 314.803 118.823 315.757 118.823 316.582C118.823 317.406 118.373 317.803 117.823 317.463C117.273 317.123 116.823 316.17 116.823 315.345ZM202.323 313.963C202.598 313.963 202.823 314.188 202.823 314.463C202.823 314.738 202.598 314.963 202.323 314.963C202.048 314.963 201.823 314.738 201.823 314.463C201.823 314.188 202.048 313.963 202.323 313.963ZM74.7635 305.963C75.3455 305.963 75.8231 306.413 75.8231 306.963C75.823 307.513 75.6246 307.963 75.3817 307.963C75.1386 307.963 74.6629 307.513 74.3231 306.963C73.9831 306.413 74.1818 305.964 74.7635 305.963ZM71.8231 304.963C72.373 304.963 72.8231 305.413 72.8231 305.963C72.823 306.513 72.3729 306.963 71.8231 306.963C71.2731 306.963 70.8232 306.513 70.8231 305.963C70.8231 305.413 71.2731 304.963 71.8231 304.963ZM131.823 306.07C131.823 304.426 129.038 304.086 127.17 305.5C125.465 306.792 125.573 306.902 128.573 306.931C130.36 306.949 131.823 306.561 131.823 306.07ZM86.8231 303.963C87.5559 303.963 87.856 304.263 87.4901 304.63C87.1231 304.996 86.5231 304.996 86.1561 304.63C85.7901 304.263 86.0901 303.963 86.8231 303.963ZM77.2401 304.042C78.294 303.999 78.8836 304.235 78.5516 304.567C78.2196 304.899 77.3566 304.935 76.6356 304.646C75.838 304.327 76.0752 304.09 77.2401 304.042ZM78.8231 300.963C79.373 300.963 79.8231 301.413 79.8231 301.963C79.823 302.513 79.3729 302.963 78.8231 302.963C78.2731 302.963 77.8232 302.513 77.8231 301.963C77.8231 301.413 78.2731 300.963 78.8231 300.963ZM70.3231 299.963C71.148 299.963 71.8231 300.624 71.8231 301.432C71.8231 302.326 71.2371 302.675 70.3231 302.325C69.4981 302.008 68.8231 301.347 68.8231 300.856C68.8233 300.365 69.4982 299.963 70.3231 299.963ZM69.8231 291.963C70.3727 291.963 70.8226 292.161 70.8231 292.404C70.8231 292.647 70.3731 293.123 69.8231 293.463C69.2731 293.803 68.8231 293.604 68.8231 293.022C68.8232 292.44 69.2731 291.963 69.8231 291.963ZM270.323 285.963C271.148 285.963 271.823 286.133 271.823 286.341C271.823 286.548 271.148 287.279 270.323 287.963C269.094 288.983 268.823 288.914 268.823 287.585C268.823 286.693 269.498 285.963 270.323 285.963ZM275.323 284.963C275.598 284.963 275.823 285.188 275.823 285.463C275.823 285.738 275.598 285.963 275.323 285.963C275.048 285.963 274.823 285.738 274.823 285.463C274.823 285.188 275.048 284.963 275.323 284.963ZM273.515 281.322C274.055 279.913 274.222 279.924 275.064 281.429C276.122 283.319 275.489 284.493 273.932 283.531C273.371 283.182 273.183 282.189 273.515 281.322ZM269.981 280.963C269.981 279.588 270.208 279.026 270.485 279.713C270.763 280.401 270.763 281.526 270.485 282.213C270.208 282.901 269.981 282.338 269.981 280.963ZM272.323 279.963C272.598 279.963 272.823 280.188 272.823 280.463C272.823 280.738 272.598 280.963 272.323 280.963C272.048 280.963 271.823 280.738 271.823 280.463C271.823 280.188 272.048 279.963 272.323 279.963ZM266.479 278.508C266.109 277.545 266.407 277.251 267.374 277.622C269.054 278.267 269.168 278.632 267.928 279.398C267.435 279.703 266.783 279.302 266.479 278.508ZM273.323 277.963C273.598 277.963 273.823 278.188 273.823 278.463C273.823 278.738 273.598 278.963 273.323 278.963C273.048 278.963 272.823 278.738 272.823 278.463C272.823 278.188 273.048 277.963 273.323 277.963ZM312.823 274.963C312.823 274.23 313.123 273.93 313.49 274.296C313.856 274.663 313.856 275.263 313.49 275.63C313.123 275.996 312.823 275.696 312.823 274.963ZM306.823 264.522C306.823 262.765 307.423 262.507 308.28 263.894C308.597 264.406 308.398 265.108 307.839 265.454C307.28 265.798 306.823 265.379 306.823 264.522ZM39.241 257.57C36.868 256.659 36.5506 256.812 37.2156 258.545C37.5496 259.415 37.8231 260.315 37.8231 260.545C37.8235 260.775 38.4984 260.963 39.3231 260.963C41.3139 260.963 41.251 258.341 39.241 257.57ZM294.721 251.963C296.379 251.963 302.87 258.076 302.261 259.064C300.769 261.477 295.519 258.26 294.343 254.213C293.964 252.911 294.123 251.964 294.721 251.963ZM274.323 255.963C274.048 255.963 273.823 256.188 273.823 256.463C273.823 256.738 274.048 256.963 274.323 256.963C274.598 256.963 274.823 256.738 274.823 256.463C274.823 256.188 274.598 255.963 274.323 255.963ZM268.323 252.963C268.048 252.963 267.823 253.188 267.823 253.463C267.823 253.738 268.048 253.963 268.323 253.963C268.598 253.963 268.823 253.738 268.823 253.463C268.823 253.188 268.598 252.963 268.323 252.963ZM266.646 249.296C266.257 247.287 264.26 246.448 263.356 247.911C262.476 249.334 263.598 250.963 265.455 250.963C266.331 250.963 266.833 250.26 266.646 249.296ZM269.323 249.963C269.048 249.963 268.823 250.188 268.823 250.463C268.823 250.738 269.048 250.963 269.323 250.963C269.598 250.963 269.823 250.738 269.823 250.463C269.823 250.188 269.598 249.963 269.323 249.963ZM24.3231 232.963C24.598 232.963 24.8231 233.188 24.8231 233.463C24.823 233.738 24.5979 233.963 24.3231 233.963C24.0481 233.963 23.8232 233.738 23.8231 233.463C23.8231 233.188 24.0481 232.963 24.3231 232.963ZM26.3231 232.963C26.598 232.963 26.8231 233.188 26.8231 233.463C26.823 233.738 26.5979 233.963 26.3231 233.963C26.0481 233.963 25.8232 233.738 25.8231 233.463C25.8231 233.188 26.0481 232.963 26.3231 232.963ZM30.3231 182.963C30.0481 182.963 29.8231 183.188 29.8231 183.463C29.8232 183.738 30.0481 183.963 30.3231 183.963C30.5979 183.963 30.823 183.738 30.8231 183.463C30.8231 183.188 30.598 182.963 30.3231 182.963ZM25.8231 182.963C26.5559 182.963 26.856 183.263 26.4901 183.63C26.1231 183.996 25.5231 183.996 25.1561 183.63C24.7901 183.263 25.0901 182.963 25.8231 182.963ZM24.5418 168.045C24.7068 165.852 23.3077 164.369 22.4237 165.799C22.1289 166.277 22.4496 167.439 23.1375 168.378C24.2905 169.956 24.3998 169.93 24.5418 168.045ZM26.3231 165.963C26.0481 165.963 25.8231 166.188 25.8231 166.463C25.8232 166.738 26.0481 166.963 26.3231 166.963C26.5979 166.963 26.823 166.738 26.8231 166.463C26.8231 166.188 26.598 165.963 26.3231 165.963ZM278.023 154.164C281.374 150.813 285.386 154.145 284.39 159.453C283.619 163.564 281.534 164.032 278.766 160.713C276.583 158.097 276.33 155.857 278.023 154.164ZM0.823065 156.963C1.55594 156.963 1.85603 157.263 1.49006 157.63C1.12312 157.996 0.523086 157.996 0.156073 157.63C-0.209927 157.263 0.0900652 156.963 0.823065 156.963ZM286.917 147.963C287.415 147.963 287.823 148.863 287.823 149.963C287.823 151.063 287.65 151.962 287.44 151.963C287.229 151.963 286.821 151.063 286.533 149.963C286.246 148.863 286.418 147.963 286.917 147.963ZM285.323 145.963C285.598 145.963 285.823 146.188 285.823 146.463C285.823 146.738 285.598 146.963 285.323 146.963C285.048 146.963 284.823 146.738 284.823 146.463C284.823 146.188 285.048 145.963 285.323 145.963ZM293.205 142.963C293.48 142.963 293.983 143.413 294.323 143.963C294.663 144.513 294.716 144.963 294.441 144.963C294.166 144.963 293.663 144.513 293.323 143.963C292.983 143.413 292.93 142.963 293.205 142.963ZM18.6795 133.08C18.8755 133.016 18.7986 133.583 18.5076 134.341C18.2168 135.099 18.5072 136.25 19.1512 136.898C20.0502 137.802 19.7528 137.866 17.8738 137.174C14.8158 136.047 14.1344 134.282 16.5184 133.664C17.5105 133.407 18.4825 133.144 18.6795 133.08ZM27.4901 131.63C28.6061 130.513 29.4901 130.881 29.4901 132.463C29.49 133.288 28.8899 133.963 28.1561 133.963C26.7371 133.963 26.3861 132.734 27.4901 131.63ZM293.763 131.963C294.345 131.963 294.823 132.413 294.823 132.963C294.823 133.513 294.625 133.963 294.382 133.963C294.139 133.963 293.663 133.513 293.323 132.963C292.983 132.413 293.182 131.964 293.763 131.963ZM296.323 132.963C296.598 132.963 296.823 133.188 296.823 133.463C296.823 133.738 296.598 133.963 296.323 133.963C296.048 133.963 295.823 133.738 295.823 133.463C295.823 133.188 296.048 132.963 296.323 132.963ZM20.8231 128.963C21.373 128.963 21.8231 129.638 21.8231 130.463C21.823 131.288 21.3729 131.963 20.8231 131.963C20.2731 131.963 19.8231 131.288 19.8231 130.463C19.8231 129.638 20.2731 128.963 20.8231 128.963ZM302.823 129.091C306.081 127.786 307.823 127.729 307.823 128.928C307.823 130.677 303.932 132.124 302.06 131.07C300.503 130.194 300.582 129.989 302.823 129.091ZM14.3885 125.861C17.5155 124.636 18.4666 124.918 16.4256 126.463C15.3817 127.253 14.062 127.611 13.492 127.258C12.8941 126.889 13.2737 126.298 14.3885 125.861ZM290.882 124.963C291.4 124.963 291.823 125.413 291.823 125.963C291.823 126.513 291.12 126.963 290.263 126.963C289.407 126.963 288.983 126.513 289.323 125.963C289.663 125.413 290.364 124.963 290.882 124.963ZM253.323 104.963C253.048 104.963 252.823 105.188 252.823 105.463C252.823 105.738 253.048 105.963 253.323 105.963C253.598 105.963 253.823 105.738 253.823 105.463C253.823 105.188 253.598 104.963 253.323 104.963ZM38.3231 101.963C38.598 101.963 38.8231 102.188 38.8231 102.463C38.823 102.738 38.5979 102.963 38.3231 102.963C38.0481 102.963 37.8232 102.738 37.8231 102.463C37.8231 102.188 38.0481 101.963 38.3231 101.963ZM43.3231 100.963C43.598 100.963 43.8231 101.188 43.8231 101.463C43.823 101.738 43.5979 101.963 43.3231 101.963C43.0481 101.963 42.8232 101.738 42.8231 101.463C42.8231 101.188 43.0481 100.963 43.3231 100.963ZM32.0731 95.9458C33.86 94.8529 35.9221 94.1854 36.6551 94.4614C37.3872 94.7374 38.7372 94.9995 39.6551 95.0424C40.6539 95.0895 40.8314 95.3207 40.0975 95.6176C39.4238 95.8904 38.6452 95.9673 38.367 95.7885C38.089 95.6095 37.152 96.4753 36.286 97.7133C35.258 99.1803 33.6844 99.9633 31.7654 99.9633C27.9139 99.9632 28.0332 98.4167 32.0731 95.9458ZM260.323 98.9633C260.598 98.9634 260.823 99.1884 260.823 99.4633C260.823 99.7382 260.598 99.9632 260.323 99.9633C260.048 99.9633 259.823 99.7383 259.823 99.4633C259.823 99.1883 260.048 98.9633 260.323 98.9633ZM42.3231 97.9633C42.598 97.9634 42.8231 98.1884 42.8231 98.4633C42.823 98.7382 42.5979 98.9632 42.3231 98.9633C42.0481 98.9633 41.8232 98.7383 41.8231 98.4633C41.8231 98.1883 42.0481 97.9633 42.3231 97.9633ZM54.6434 89.7915C54.2964 87.4396 52.372 86.2652 51.411 87.8198C50.504 89.2878 51.8519 91.9633 53.4998 91.9633C54.4317 91.9633 54.8462 91.1762 54.6434 89.7915ZM239.323 74.9633C239.598 74.9634 239.823 75.1884 239.823 75.4633C239.823 75.7382 239.598 75.9632 239.323 75.9633C239.048 75.9633 238.823 75.7383 238.823 75.4633C238.823 75.1883 239.048 74.9633 239.323 74.9633ZM273.823 72.9594C273.823 72.4464 274.498 72.2376 275.323 72.4946C276.148 72.7526 277.573 73.2036 278.49 73.4965C279.664 73.8715 279.843 74.3424 279.097 75.0883C277.917 76.2677 273.824 74.6152 273.823 72.9594ZM69.8074 71.2133C69.8294 69.4163 68.1488 69.6726 67.4178 71.5766C67.0247 72.6002 66.0719 73.0001 64.8113 72.6704C63.7187 72.3845 62.8236 72.5091 62.8231 72.9477C62.8231 73.3867 64.0183 74.0465 65.4783 74.4135C68.145 75.0822 69.7744 73.878 69.8074 71.2133ZM244.382 68.9633C244.139 68.9636 243.663 69.4135 243.323 69.9633C242.983 70.5132 243.182 70.9631 243.763 70.9633C244.345 70.9633 244.823 70.5133 244.823 69.9633C244.823 69.4133 244.625 68.9633 244.382 68.9633ZM241.323 67.9633C241.048 67.9633 240.823 68.1883 240.823 68.4633C240.823 68.7383 241.048 68.9633 241.323 68.9633C241.598 68.9632 241.823 68.7382 241.823 68.4633C241.823 68.1884 241.598 67.9634 241.323 67.9633ZM144.24 46.0424C143.075 46.0904 142.838 46.327 143.636 46.646C144.357 46.935 145.22 46.8988 145.552 46.5669C145.884 46.2349 145.294 45.9995 144.24 46.0424ZM181.823 43.9633C181.09 43.9633 180.79 44.2633 181.156 44.6303C181.523 44.9962 182.123 44.9963 182.49 44.6303C182.856 44.2634 182.556 43.9634 181.823 43.9633ZM147.345 34.3335C146.209 33.8976 145.532 34.3585 145.147 35.8335C144.84 37.0054 143.967 37.9633 143.206 37.9633C142.446 37.9633 141.823 38.4133 141.823 38.9633C141.823 40.4821 144.417 40.1582 145.823 38.4633C146.508 37.6384 148.111 36.9635 149.386 36.9633C150.661 36.9633 151.983 36.5133 152.323 35.9633C152.663 35.4133 152.051 34.9633 150.964 34.9633C149.876 34.9633 148.247 34.6804 147.345 34.3335ZM138.947 36.6958C137.959 35.7159 137.845 35.8314 138.387 37.2563C138.763 38.2423 139.322 38.7967 139.63 38.4887C139.938 38.1817 139.631 37.3747 138.947 36.6958ZM160.323 29.9633C160.598 29.9634 160.823 30.1884 160.823 30.4633C160.823 30.7382 160.598 30.9632 160.323 30.9633C160.048 30.9633 159.823 30.7382 159.823 30.4633C159.823 30.1883 160.048 29.9633 160.323 29.9633ZM205.823 28.9633C206.556 28.9634 206.856 29.2634 206.49 29.6303C206.123 29.9963 205.523 29.9961 205.156 29.6303C204.79 29.2633 205.09 28.9633 205.823 28.9633ZM210.823 24.9633C211.373 24.9634 211.823 25.161 211.823 25.4038C211.823 25.6468 211.373 26.1233 210.823 26.4633C210.273 26.8033 209.823 26.6039 209.823 26.0219C209.823 25.44 210.273 24.9633 210.823 24.9633ZM176.323 24.9633C176.598 24.9634 176.823 25.1884 176.823 25.4633C176.823 25.7382 176.598 25.9632 176.323 25.9633C176.048 25.9633 175.823 25.7382 175.823 25.4633C175.823 25.1883 176.048 24.9633 176.323 24.9633ZM172.823 18.9633C173.556 18.9634 173.856 19.2634 173.49 19.6303C173.123 19.9963 172.523 19.9961 172.156 19.6303C171.79 19.2633 172.09 18.9633 172.823 18.9633ZM173.823 15.9633C173.823 15.2303 174.123 14.9303 174.49 15.2963C174.856 15.6634 174.856 16.2634 174.49 16.6303C174.123 16.9963 173.823 16.6962 173.823 15.9633ZM208.823 13.9633C209.556 13.9634 209.856 14.2634 209.49 14.6303C209.123 14.9963 208.523 14.9962 208.156 14.6303C207.79 14.2633 208.09 13.9633 208.823 13.9633ZM177.323 12.9633C177.598 12.9634 177.823 13.1884 177.823 13.4633C177.823 13.7382 177.598 13.9632 177.323 13.9633C177.048 13.9633 176.823 13.7382 176.823 13.4633C176.823 13.1883 177.048 12.9633 177.323 12.9633ZM166.323 10.9633C166.598 10.9634 166.823 11.1884 166.823 11.4633C166.823 11.7382 166.598 11.9632 166.323 11.9633C166.048 11.9633 165.823 11.7382 165.823 11.4633C165.823 11.1883 166.048 10.9633 166.323 10.9633ZM175.823 10.9633C175.823 10.2303 176.123 9.93035 176.49 10.2963C176.856 10.6634 176.856 11.2634 176.49 11.6303C176.123 11.9963 175.823 11.6962 175.823 10.9633ZM171.323 9.96334C171.598 9.96343 171.823 10.1884 171.823 10.4633C171.823 10.7382 171.598 10.9632 171.323 10.9633C171.048 10.9633 170.823 10.7382 170.823 10.4633C170.823 10.1883 171.048 9.96334 171.323 9.96334ZM132.382 6.96334C132.625 6.96334 132.823 7.41334 132.823 7.96334C132.823 8.51325 132.345 8.96334 131.763 8.96334C131.182 8.96314 130.983 8.51318 131.323 7.96334C131.663 7.41353 132.139 6.96364 132.382 6.96334ZM122.823 7.96334C123.556 7.96339 123.856 8.26336 123.49 8.63033C123.123 8.99625 122.523 8.99614 122.156 8.63033C121.79 8.26333 122.09 7.96334 122.823 7.96334ZM167.204 2.311C170.133 -0.207938 172.823 -0.770742 172.823 1.13424C172.823 2.86018 169.742 5.96305 168.028 5.96334C167.212 5.96334 166.002 6.70389 165.34 7.60885C164.278 9.06077 164.156 8.98412 164.305 6.95846C164.398 5.69446 165.703 3.603 167.204 2.311Z"
              className={FILL_BELOW[period]}
            />
          </g>
          <path
            id="stroke1_1_4_ref"
            d="M4.33545 12C58.4453 24.7021 128.394 31.7637 200.977 31.8516C273.56 31.9396 343.755 25.0478 398.309 12.4773"
          />
        </defs>
      </svg>
    </div>
  )
}
