const fs = require('fs');
const path = require('path');

const tsv = `Order Number	Customer Name	Category Name	Melting	Weight	Total Quantity	Karigar Name	Order Date	Karigar Delivery Date	Delivery Date	Expected Delivery Date	Left Days	Order Type	Order Stage	Karigar Notes	Total Weight	Live Left Days
JF-01	Botivate Demo	JHUMKI	92	9 gm - 10gm	1 PAIR	RK PINTU	16-11-2024	23-11-2024	26-11-2024	26-11-2024	6	Customer order	in_process		2.5	-478
JF-9615	NEW LADO JEW	PLASTER BANGLE	84	35 gm - 40gm	2 PCS	SP	10-07-2025	17-07-2025	21-07-2025	21-07-2025	10	Customer order	in_process		40	-241
JF-9755	JF PADMINI JEW	CHAIN	75	24 gm - 25gm	1 PCS	SP	25-07-2025	31-07-2025	04-08-2025	04-08-2025	9	Customer order	in_process		25	-227
JF-9752	ATW VIJIT BARADIA	PENDANTS	84	2gm - 6gm	1	SKS	25-07-2025	04-08-2025	04-08-2025	04-08-2025	9	Stock order	in_process		150	-227
JF-10300	Subodh jewellers	2 PCS BANGLES	92	30gm - 33gm	6 PCS	SKA	22-08-2025	02-09-2025	05-09-2025	05-09-2025	13	Stock order	in_process		94.69	-160
JF-10563	JF RAJAT JEWELLERS	SHORT SET	84	20 gm - 21gm	1 PCS	SKS	01-09-2025	08-09-2025	11-09-2025	11-09-2025	8	Customer order	in_process		21	-187
JF-10643	JF SWARN LAXMI JEW	LADIES RING	92	3.5 gm - 4gm	1 PCS	SS	05-09-2025	12-09-2025	15-09-2025	15-09-2025	9	Customer order	in_process		4	-177
JF-10889	JF SWARN LATA JEWELLERS 9718346786	CHAIN	92	19 gm - 20gm	1 PCS	MANOJ JEW BMY	16-09-2025	29-09-2025	01-10-2025	01-10-2025	14	Urgent order	in_process	20		-169
JF-10888	JF SWARN LATA JEWELLERS 9718346786	GENTS BRACELET / KADA	92	14 gm - 15gm	1 PCS	MANOJ JEW BMY	16-09-2025	29-09-2025	01-10-2025	01-10-2025	14	Urgent order	in_process	15		-169
JF-11024	JF SHREE JEWELLER	BANGLES	92	29 gm - 30gm	2 PCS	SKA	24/09/2025	01/10/2025	04/10/2025	04/10/2025	9	Urgent order	in_process	30		-166
JF-11125	AT PANDRI	2 PCS BANGLES	92	25gm - 30gm	2 PCS	SKA	03/10/2025	05/10/2025	08/10/2025	08/10/2025	5	Stock order	in_process		30	-159
JF-11157	ATW RAJVEER JEW SHEVNI NARAYAN 9424173478	GENTS BRACELET / KADA	92	19 gm - 20gm	1 PCS	SKA	03/10/2025	10/10/2025	14/10/2025	14/10/2025	10	Urgent order	in_process	20		-154
JF-11215	ATW LAXMI JEWEL DHARAMGARH	BANGLES	92	40 gm - 42gm	2 PCS	ACTION GOLD BMY	06/10/2025	10/10/2025	16/10/2025	16/10/2025	9	Urgent order	in_process		42	-154
JF-11196	AT PANDRI	CHAIN	92	14 gm - 15gm	1 PCS	LESHYA KM	04/10/2025	13/10/2025	20/10/2025	20/10/2025	13	Urgent order	in_process		15	-150
JF-11236	JF OM JEW DIPKA 8109150061	BANGLES	92	24.5 gm - 25gm	2 PCS	SKS	07/10/2025	14/10/2025	16/10/2025	16/10/2025	9	Urgent order	in_process	25		-154
JF-11282	JF DINESH JEW MUNGELI 9713949999	NATH / NOSE RING	92	5gm - 6gm	1 PCS	SP	08/10/2025	15/10/2025	18/10/2025	18/10/2025	10	Customer order	in_process	6		-152
JF-11331	JF BILASPUR JEWELLERS	KANNOTI EARRING	84	16 gm - 17gm	1 PAIR	SP	10/10/2025	15/10/2025	17/10/2025	17/10/2025	6	Urgent order	in_process	17		-153
JF-11347	JF MAA JEW KESHKAL	CHAIN	92	3gm - 3.5gm	1 PCS	PB	11/10/2025	15/10/2025	17/10/2025	17/10/2025	4	Urgent order	in_process	3.5		-153
JF-11377	JF SHREE SHANKAR JEW AMBIKAPUR	PENDANTS	24K	4gm - 10gm	4 PCS	LK	14/10/2025	15/10/2025	16/10/2025	16/10/2025	1	Urgent order	in_process	30		-154
JF-11391	ATO PANDRI	EARRINGS	92	2gm - 3gm	20 PCS	JOYDEB MANNA	15/10/2025	15/10/2025	16/10/2025	16/10/2025	0	Urgent order	in_process		3	-154
JF-11383	Aditya Birla jewellery Noval	SHORT SET	92	8.115gm - 21.209gm	1	PK	15/10/2025	15/10/2025	18/10/2025	18/10/2025	2	Urgent order	in_process		29.324	-152
JF-11479	JF SANTOSH JI CL 9330147111	SET	92	95gm - 100gm	1	CK	27/10/2025	29/10/2025	01/11/2025	01/11/2025	4	Customer order	in_process		100	-136
JF-11477	JF SANTOSH JI CL 9330147111	SET	92	95gm - 100gm	3 PCS	CK	27/10/2025	29/10/2025	01/11/2025	01/11/2025	4	Customer order	in_process		100	-136
JF-11468	ATW VIJIT BARADIA	2 PCS BANGLES	92	20gm - 22gm	6 PCS	PK	27/10/2025	28/10/2025	30/10/2025	31/10/2025	3	Stock order	in_process		66	-139
JF-11447	ATW VIJIT BARADIA	LONG SET	84	15gm - 20gm	1	PK	25/10/2025	28/10/2025	31/10/2025	31/10/2025	3	Stock order	in_process		200	-115
JF-11438	ATW VIJIT BARADIA	DOUBLE HOOK PENDANTS	92	3gm - 6gm	1	JOYDEB MANNA	25/10/2025	28/10/2025	31/10/2025	31/10/2025	3	Stock order	in_process		200	-139
JF-11430	KUBDE JEWELLERS	CHAIN	92	25gm - 25gm	1	SURAJIT JANA	24/10/2025	01/11/2025	03/11/2025	04/11/2025	7	Customer order	in_process		25	-135
JF-11419	ATW Deep Jewellers	BANGLES	75	19 gm - 20gm	1 PCS	SKA	18/10/2025	31/10/2025	03/11/2025	03/11/2025	6	Customer order	in_process		20	-136
JF-11520	AT PANDRI	SHORT SET	92	35gm - 40gm	1 PCS	NB	29/10/2025	07/11/2025	08/11/2025	08/11/2025	10	Urgent order	in_process	40		-131
JF-11559	JF DEVI PRASAD JEWELLERS	LONG SET	92	75gm - 110gm	1 PCS	NOT ASSIGNED	30/10/2025	10/11/2025	13/11/2025	13/11/2025	13	Urgent order	in_process	185		-110
JF-11547	ATW PRAKASH JEW PALI KORBA 9479241185	SHORT SET	92	33gm - 35gm	1 PCS	PK	30/10/2025	07/11/2025	10/11/2025	10/11/2025	10	Customer order	in_process	35		-129
JF-11545	ATW LAXMI JEWELLERS DHARAMGARH	ANTIQUE SET	92	29 gm - 30gm	1 PCS	SUJATA GOLD BMY	30/10/2025	10/11/2025	13/11/2025	13/11/2025	13	Urgent order	in_process	30		-126
JF-11575	ATW VIJIT BARADIA	DOUBLE HOOK PENDANTS	92	6gm - 9gm	1	JOYDEB MANNA	31/10/2025	03/11/2025	06/11/2025	06/11/2025	5	Stock order	in_process		200	-133
JF-11573	ATW VIJIT BARADIA	CHAIN SET	92	15gm - 20gm	15 PCS	PK	31/10/2025	04/11/2025	07/11/2025	07/11/2025	6	Stock order	in_process		300	-79
JF-11571	JF SANTOSH JI CL 9330147111	RINGS	92	4gm - 7gm	5 PCS	PK	31/10/2025	03/11/2025	06/11/2025	06/11/2025	5	Customer order	in_process		35	-133
JF-11584	JF GEHNA GHAR 9425512188	GENTS BRACELET / KADA	92	28 gm - 30gm	1 PCS	ZAR	31/10/2025	04/11/2025	06/11/2025	06/11/2025	5	Urgent order	in_process	30		-133
JF-11612	AT PANDRI	REJI BANGLE	92	30 gm - 32gm	2 PCS	C L OFFICE	03/11/2025	13/11/2025	15/11/2025	15/11/2025	11	Urgent order	in_process		32	-124
JF-11624	JF SHILPI JEW BIJURI	PENDANTS	84	2.5 gm - 3gm	1 PCS	SP	04/11/2025	11/11/2025	14/11/2025	14/11/2025	9	Customer order	in_process	3		-125
JF-11623	JF DINESH JEW MUNGELI 9713949999	BINDIYA / MANGTIKA	92	5gm - 6gm	2 PCS	SP	04/11/2025	11/11/2025	14/11/2025	14/11/2025	9	Customer order	in_process	11		-125
JF-11645	JF SHILPI JEW BIJURI	EARRINGS	92	3gm - 5gm	3 PAIR	SKS	06/11/2025	14/11/2025	17/11/2025	17/11/2025	10	Customer order	in_process		13	-115
JF-11639	JF SHILPI JEW BIJURI	JHUMKI	92	4gm - 7gm	6 PAIR	SP	06/11/2025	15/11/2025	18/11/2025	18/11/2025	11	Customer order	in_process		33	-121
JF-11638	ATW VINAYAK JEWELLERS KATABHANJI	JHUMKI	92	11.5 gm - 12gm	3 PAIR	DAGINA	06/11/2025	18/11/2025	26/11/2025	26/11/2025	19	Customer order	in_process		36	-113
JF-11635	Atplus mumbai	4 PCS BANGLES	92	59gm - 60gm	4 PCS	SKA	05/11/2025	12/11/2025	15/11/2025	15/11/2025	8	Customer order	in_process		60	-124
JF-11628	Atplus mumbai	BANGLES	92	44gm - 45gm	2	SKA	05/11/2025	13/11/2025	19/11/2025	19/11/2025	12	Customer order	in_process		45	-120
JF-11627	ATW ADITYA JEW	CHAIN	92	24 gm - 25gm	1 PCS	MANOJ JEW BMY	05/11/2025	10/11/2025	17/11/2025	17/11/2025	10	Customer order	in_process		25	-122
JF-11661	JF KALSUN JEWELLERS	JHUMKI	92	11 gm - 12gm	1 PAIR	UJJAL KARIGAR ANTIQUE	08/11/2025	20/11/2025	24/11/2025	24/11/2025	16	Customer order	in_process	12		-115
JF-11660	ATW Radheshyam Chunnilal Jew 9691070009	SHORT SET	92	20 gm - 21gm	1 PCS	JK	08/11/2025	15/11/2025	18/11/2025	18/11/2025	10	Customer order	in_process	21		-121
JF-11659	JF VARSHA JEWELLERS 9993407348	TOPS	84	3.5 gm - 4gm	1 PAIR	SP	08/11/2025	11/11/2025	12/11/2025	12/11/2025	4	Customer order	in_process	4		-127
JF-11667	JF PREETI JEWELLERS 7477037743	CHANDBALI	92	7.5 gm - 8gm	2 PAIR	SP	08/11/2025	15/11/2025	18/11/2025	18/11/2025	8	Customer order	in_process		16	-121
JF-11683	JF MAHALAXMI JEW	SET	92	279gm - 280gm	1 PCS	UJJAL KARIGAR ANTIQUE	10/11/2025	20/11/2025	21/11/2025	21/11/2025	10	Urgent order	in_process	280		-118
JF-11687	JF MAHAMAYA ABHUSHAN 8889377888	EARRINGS	92	6.5 gm - 7gm	1 PAIR	SP	11/11/2025	18/11/2025	21/11/2025	21/11/2025	9	Customer order	in_process	7		-118
JF-11698	Aditya Birla jewellery Noval	1 PCS BANGLES	92	14gm - 14.5gm	1 PCS	SKA	11/11/2025	14/11/2025	17/11/2025	17/11/2025	5	Urgent order	in_process		14.5	-122
JF-11709	JF KAMLESH JEW	NATH / NOSE RING	92	1.3 gm - 1.4gm	2 PCS	SKS	12/11/2025	19/11/2025	22/11/2025	22/11/2025	9	Customer order	in_process	2.8		-117
JF-11708	ATW MOOLSHRI JEW BARHI KATNI	GENTS RING	84	4.5 gm - 5gm	1 PCS	SKS	12/11/2025	19/11/2025	22/11/2025	22/11/2025	9	Customer order	in_process	5		-117
JF-11707	Atplus mumbai	BANGLES	92	47 gm - 48gm	2 PCS	SKA	12/11/2025	16/11/2025	18/11/2025	18/11/2025	5	Urgent order	in_process	48		-121
JF-11706	ATW PRAKASH JEW PALI KORBA 9479241185	LADIES RING	92	4.5 gm - 5gm	1 PCS	SKS	12/11/2025	19/11/2025	22/11/2025	22/11/2025	9	Customer order	in_process	5		-117
JF-11727	JF MAHESHWARI JEWELLERS 7879495151	LADIES RING	84	4gm - 4.5gm	1 PCS	SKS	14/11/2025	21/11/2025	24/11/2025	24/11/2025	10	Customer order	in_process	4.5		-115
JF-11734	ATW RAJVEER JEW SHEVNI NARAYAN 9424173478	ANTIQUE SET	92	34 gm - 35gm	1 PCS	UJJAL KARIGAR ANTIQUE	14/11/2025	26/11/2025	02/12/2025	02/12/2025	17	Customer order	in_process		35	-87
JF-11731	JF SHANT JEW 9861255899	JHUMKI	92	18 gm - 19gm	1 PAIR	SKS	14/11/2025	21/11/2025	24/11/2025	24/11/2025	9	Customer order	in_process		19	-115
JF-11729	AJAY JI GOLCHA KD	RINGS	14	0gm - 0gm	2 PCS	PIYUSH DMD	14/11/2025	15/11/2025	17/11/2025	17/11/2025	2	Urgent order	in_process			-122
JF-11728	ATO PANDRI	BABY BANGLE	92	3gm - 4gm	2 PCS	SKA	14/11/2025	14/11/2025	15/11/2025	15/11/2025	0	Urgent order	in_process		4.2	-124
JF-11724	Atplus mumbai	2 PCS BANGLES	92	28gm - 29gm	2 PCS	SKA	13/11/2025	17/11/2025	20/11/2025	20/11/2025	5	Stock order	in_process		29	-119
JF-11723	Atplus mumbai	2 PCS BANGLES	92	29gm - 30gm	2 PCS	SKA	13/11/2025	17/11/2025	20/11/2025	20/11/2025	5	Stock order	in_process		30	-119
JF-11722	Atplus mumbai	2 PCS BANGLES	92	28gm - 29gm	2 PCS	SKA	13/11/2025	17/11/2025	20/11/2025	20/11/2025	5	Stock order	in_process		29	-119
JF-11721	Atplus mumbai	2 PCS BANGLES	92	29gm - 30gm	2 PCS	SKA	13/11/2025	17/11/2025	20/11/2025	20/11/2025	5	Stock order	in_process		30	-119
JF-11720	Atplus mumbai	2 PCS BANGLES	92	27gm - 28gm	2 PCS	SKA	13/11/2025	17/11/2025	20/11/2025	20/11/2025	5	Stock order	in_process		28	-119
JF-11719	Atplus mumbai	2 PCS BANGLES	92	19gm - 20gm	2 PCS	SKA	13/11/2025	17/11/2025	20/11/2025	20/11/2025	5	Stock order	in_process		21	-119
JF-11718	Atplus mumbai	2 PCS BANGLES	92	27gm - 28gm	2 PCS	SKA	13/11/2025	17/11/2025	20/11/2025	20/11/2025	5	Stock order	in_process		28	-119
JF-11711	ATW VIJIT BARADIA	JHUMKI	84	6gm - 10gm	1	SKS	12/11/2025	17/11/2025	20/11/2025	20/11/2025	5	Stock order	in_process		150	-119
JF-11710	ATW VIJIT BARADIA	DOUBLE HOOK PENDANTS	84	3gm - 6gm	1	SKS	12/11/2025	17/11/2025	20/11/2025	20/11/2025	5	Stock order	in_process		150	-119
JF-11745	BHAVESH ARYA BANG	SHORT SET	75	10gm - 29gm	18 PCS	SKS	15/11/2025	21/11/2025	22/11/2025	22/11/2025	5	Urgent order	in_process	472		-117
JF-11750	ARCHANA JEWELLERS	MANGALSUTRA	75	19 gm - 20gm	1 PCS	SP	17/11/2025	25/11/2025	29/11/2025	29/11/2025	12	Customer order	in_process		20	-110
JF-11749	ATO PANDRI	JF COIN	92	8gm - 8gm	6 PCS	JF SHIVAM	17/11/2025	18/11/2025	20/11/2025	20/11/2025	3	Urgent order	in_process		48	-119
JF-11765	AT PANDRI	PLASTER BANGLE	92	39gm - 40gm	2 PCS	C L OFFICE	17/11/2025	26/11/2025	29/11/2025	29/11/2025	11	Urgent order	in_process		40	-110
JF-11764	Atplus mumbai	4 PCS BANGLES	92	15.5gm - 16gm	4 PCS	PK	17/11/2025	24/11/2025	27/11/2025	27/11/2025	9	Customer order	in_process		16	-112
JF-11762	ATW SATRUPA JEW KAWARDHA	CHOKER SET	92	27 gm - 28gm	1 PCS	SBR GOLD & ART	17/11/2025	25/11/2025	29/11/2025	29/11/2025	11	Customer order	in_process		28	-110
JF-11760	ATW Roop jew balangir	BANGLES	92	7.8 gm - 8gm	1 PCS	SKA	17/11/2025	25/11/2025	28/11/2025	28/11/2025	10	Customer order	in_process		8	-111
JF-11758	ATW POOJA JEW (SAO JI )	BANGLES	92	39gm - 40gm	2 PCS	SKA	17/11/2025	25/11/2025	27/11/2025	27/11/2025	9	Urgent order	in_process		40	-112
JF-11778	ATW ANUPAM JEWELLERS	CHOKER SET	92	44 gm - 45gm	1 PCS	SP	18/11/2025	22/11/2025	25/11/2025	25/11/2025	6	Urgent order	in_process		45	-114
JF-11773	AT PANDRI	PENDANTS	92	0.5gm - 1gm	10 PCS	JK	18/11/2025	22/11/2025	25/11/2025	25/11/2025	6	Urgent order	in_process		8	-114
JF-11772	BHAVESH ARYA BANG	DORLA PENDANTS	75	1.4gm - 1.5gm	5 PCS	M RAJKOT	18/11/2025	25/11/2025	29/11/2025	29/11/2025	10	Urgent order	in_process		7.5	-110
JF-11782	Atplus mumbai	2 PCS BANGLES	92	28gm - 30gm	14 PCS	SKA	19/11/2025	23/11/2025	26/11/2025	26/11/2025	7	Stock order	in_process		210	-113
JF-11781	ATW Deep Jewellers	CHANDBALI	92	11gm - 12gm	1 PAIR	SP	19/11/2025	26/11/2025	29/11/2025	29/11/2025	10	Customer order	in_process		12	-110
JF-11793	ATW Roop jew balangir	TURKISH SET	92	12 gm - 13gm	1 PCS	CLASSIC ORNAMENT	19/11/2025	29/11/2025	04/12/2025	04/12/2025	14	Customer order	in_process	13		-105
JF-11789	Atplus mumbai	BANGLES	92	17 gm - 18gm	1 PCS	SKA	19/11/2025	26/11/2025	29/11/2025	29/11/2025	9	Customer order	in_process	18		-110
JF-11805	AT PANDRI	KANNOTI EARRING	92	20 gm - 22gm	1 PAIR	SP	20/11/2025	27/11/2025	02/12/2025	02/12/2025	11	Customer order	in_process		22	-107
JF-11800	AT PANDRI	BANGLES	92	42 gm - 43gm	2 PCS	SKA	20/11/2025	27/11/2025	01/12/2025	01/12/2025	10	Customer order	in_process		43	-108
JF-11798	JF MANGLAM JEWELLERS	CHANDBALI	92	11gm - 12gm	1 PAIR	SP	20/11/2025	27/11/2025	01/12/2025	01/12/2025	10	Customer order	in_process		12	-108
JF-11817	AT PANDRI	BANGLES	92	39 gm - 40gm	2 PCS	SKA	22/11/2025	29/11/2025	02/12/2025	02/12/2025	10	Customer order	in_process	40		-107
JF-11756	BHAVESH ARYA BANG	BINDIYA / MANGTIKA	75	3gm - 5.5gm	12 PCS	SKS	17/11/2025	29/11/2025	01/12/2025	01/12/2025	9	Urgent order	in_process	50		-108
JF-11755	BHAVESH ARYA BANG	SINGLE HOOK PENDANTS	75	1.5gm - 4.5gm	8 PCS	SKS	17/11/2025	29/11/2025	01/12/2025	01/12/2025	9	Urgent order	in_process	26		-108
JF-11754	BHAVESH ARYA BANG	DOUBLE HOOK PENDANTS	75	3gm - 6gm	25 PCS	SKS	17/11/2025	29/11/2025	01/12/2025	01/12/2025	9	Urgent order	in_process	104		-108
JF-11819	ATW LAXMI JEWELLERS DHARAMGARH	CHAIN	92	11 gm - 12gm	1 PCS	M RAJKOT	22/11/2025	02/12/2025	08/12/2025	08/12/2025	14	Customer order	in_process		12	-101
JF-11818	TRILOK SONI	PENDANTS	84	2.5gm - 3gm	1 PCS	SP	22/11/2025	29/11/2025	02/12/2025	02/12/2025	8	Customer order	in_process		3	-107
JF-11830	ANISH JI CL	EARRINGS	92	5gm - 7gm	1	PK	24/11/2025	25/11/2025	28/11/2025	28/11/2025	3	Customer order	in_process		7	-111`;

const tsvLines = tsv.trim().split('\\n');
const headers = tsvLines.shift().split('\\t');

const parsedData = tsvLines.map((line, index) => {
    const parts = line.split('\\t');
    const obj = {
        serialNo: String(index + 1),
        id: String(index + 1)
    };
    headers.forEach((header, i) => {
        let keyMap = {
            'Order Number': 'orderNumber',
            'Customer Name': 'customerName',
            'Category Name': 'categoryName',
            'Melting': 'melting',
            'Weight': 'weight',
            'Total Quantity': 'totalQuantity',
            'Karigar Name': 'karigarName',
            'Order Date': 'orderDate',
            'Karigar Delivery Date': 'karigarDeliveryDate',
            'Delivery Date': 'deliveryDate',
            'Expected Delivery Date': 'expectedDeliveryDate',
            'Left Days': 'leftDays',
            'Order Type': 'orderType',
            'Order Stage': 'orderStage',
            'Karigar Notes': 'karigarNotes',
            'Total Weight': 'totalWeight',
            'Live Left Days': 'liveLeftDays'
        };
        const key = keyMap[header.trim()];
        if (key) {
            obj[key] = (parts[i] || '').trim();
        }
    });
    // add some default dummy values for fields that exist in original getOrdersData map
    obj.colorCode = ["Red", "Blue", "Green"][Math.floor(Math.random() * 3)];
    obj.fineWeight = "0"; // or compute if necessary
    obj.planned3 = "Plan A";
    obj.planned4 = "Plan B";
    obj.planned5 = "Plan C";
    obj.planned6 = "Plan D";
    obj.planned7 = "Plan E";
    obj.planned8 = "Plan F";
    obj.planned9 = "Plan G";
    obj.planned10 = "Plan H";
    obj.planned11 = "Plan I";
    obj.planned12 = "Plan J";
    obj.planned13 = "Plan K";
    obj.planned14 = "Plan L";
    obj.planned15 = "Plan M";
    obj.huidStatus = "Sent In Huid";
    obj.labelingStatus = "Yes";
    obj.remarks13 = "Checking";
    obj.status3 = Math.random() > 0.5 ? "QC Okay" : "QC Reject";
    obj.status9 = Math.random() > 0.5 ? "QC Okay" : "QC Reject";
    obj.status12 = Math.random() > 0.5 ? "QC Okay" : "QC Reject";
    obj.status14 = "Received";
    obj.status15 = Math.random() > 0.5 ? "Complete" : "Cancel";
    obj.meenaInhouseStatus = "Polish (Inhouse)";
    obj.meenaOutsideStatus = "Polish (Outside)";
    return obj;
});

const dataString = JSON.stringify(parsedData, null, 6);

const replacementGenerater = `
  const getOrdersData = () => {
    const localData = localStorage.getItem('ordersDataV2');
    if (localData) return JSON.parse(localData);
    
    const newData = ${dataString};
    localStorage.setItem('ordersDataV2', JSON.stringify(newData));
    return newData;
  };
`;

// Now we need to update every file in src/app/pages with this new getOrdersData body.
const targetDir = path.join(__dirname, 'src', 'app', 'pages');
const files = fs.readdirSync(targetDir);

files.forEach(file => {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(targetDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find getOrdersData block
        const regex = /const\\s+getOrdersData\\s*=\\s*\\(\\)\\s*=>\\s*\\{[\\s\\S]*?  \\};/g;
        if (regex.test(content)) {
            content = content.replace(regex, replacementGenerater.trim());
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(\`Updated \${file}\`);
        } else {
            console.log(\`getOrdersData not found in \${file}\`);
        }
    }
});
