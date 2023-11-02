// Word	Opcode	Hex	Input	Output	Description
// OP_0, OP_FALSE	0	0x00	Nothing.	(empty value)	An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.)
// Pushdata Bytelength	1-75	0x01-0x4b	(special)	data	The next opcode bytes is data to be pushed onto the stack
// OP_PUSHDATA1	76	0x4c	(special)	data	The next byte contains the number of bytes to be pushed onto the stack.
// OP_PUSHDATA2	77	0x4d	(special)	data	The next two bytes contain the number of bytes to be pushed onto the stack in little endian order.
// OP_PUSHDATA4	78	0x4e	(special)	data	The next four bytes contain the number of bytes to be pushed onto the stack in little endian order.
// OP_1NEGATE	79	0x4f	Nothing.	-1	The number -1 is pushed onto the stack.
// OP_1, OP_TRUE	81	0x51	Nothing.	1	The number 1 is pushed onto the stack.
// OP_2-OP_16	82-96	0x52-0x60	Nothing.	2-16	The number in the word name (2-16) is pushed onto the stack.
// Flow control
// Word	Opcode	Hex	Input	Output	Description
// OP_NOP	97	0x61	Nothing	Nothing	Does nothing.
// OP_VER DISABLED	98	0x62	Nothing	Protocol version	Puts the version of the protocol under which this transaction will be evaluated onto the stack.
// OP_IF	99	0x63	
// [expression] IF

//    [statement 1]
// ENDIF
// OR
// [expression] IF

//    [statement 1]
// ELSE

//    [statement 2]
// ENDIF

// If the top stack value is TRUE, statement 1 is executed.
// If the top stack value is FALSE and ELSE is used, statement 2 is executed. If ELSE is NOT used, the script jumps to ENDIF.
// The top stack value is removed.
// OP_NOTIF	100	0x64	
// [expression] NOTIF

//    [statement 1]
// ENDIF
// OR
// [expression] IF

//    [statement 1]
// ELSE

//    [statement 2]
// ENDIF

// If the top stack value is FALSE, statement 1 is executed.
// If the top stack value is TRUE and ELSE is used, statement 2 is executed. If ELSE is NOT used, the script jumps to ENDIF.
// The top stack value is removed.
// OP_VERIF DISABLED	101	0x65	DISABLED	DISABLED
// OP_VERNOTIF DISABLED	102	0x66	DISABLED	DISABLED
// OP_ELSE	103	0x67	
// [expression] IF

//    [statement 1]
// ELSE

//    [statement 2]
// ENDIF

// If the preceding IF or NOTIF check was not valid then statement 2 is executed.
// OP_ENDIF	104	0x68	
// [expression] IF

//    [statements]
// ELSE

//    [statements]
// ENDIF

// Ends an if/else block. All blocks must end, or the transaction is invalid. An OP_ENDIF without a prior matching OP_IF or OP_NOTIF is also invalid.
// OP_VERIFY	105	0x69	True / false	Nothing / fail	Marks transaction as invalid if top stack value is not true. The top stack value is removed.
// OP_RETURN	106	0x6a	Nothing	Ends script with top value on stack as final result	OP_RETURN can also be used to create "False Return" outputs with a scriptPubKey consisting of OP_FALSE OP_RETURN followed by data. Such outputs are provably unspendable and should be given a value of zero Satoshis. These outputs can be pruned from storage in the UTXO set, reducing its size. Currently the BitcoinSV network supports multiple FALSE RETURN outputs in a given transaction with each one capable of holding up to 100kB of data. After the Genesis upgrade in 2020 miners will be free to mine transactions containing FALSE RETURN outputs of any size.
// Stack
// Word	Opcode	Hex	Input	Output	Description
// OP_TOALTSTACK	107	0x6b	x1	(alt)x1	Puts the input onto the top of the alt stack. Removes it from the main stack.
// OP_FROMALTSTACK	108	0x6c	(alt)x1	x1	Puts the input onto the top of the main stack. Removes it from the alt stack.
// OP_2DROP	109	0x6d	x1 x2	Nothing	Removes the top two stack items.
// OP_2DUP	110	0x6e	x1 x2	x1 x2 x1 x2	Duplicates the top two stack items.
// OP_3DUP	111	0x6f	x1 x2 x3	x1 x2 x3 x1 x2 x3	Duplicates the top three stack items.
// OP_2OVER	112	0x70	x1 x2 x3 x4	x1 x2 x3 x4 x1 x2	Copies the pair of items two spaces back in the stack to the front.
// OP_2ROT	113	0x71	x1 x2 x3 x4 x5 x6	x3 x4 x5 x6 x1 x2	The fifth and sixth items back are moved to the top of the stack.
// OP_2SWAP	114	0x72	x1 x2 x3 x4	x3 x4 x1 x2	Swaps the top two pairs of items.
// OP_IFDUP	115	0x73	x	x / x x	If the top stack value is not 0, duplicate it.
// OP_DEPTH	116	0x74	Nothing	<Stack size>	Counts the number of stack items onto the stack and places the value on the top
// OP_DROP	117	0x75	x	Nothing	Removes the top stack item.
// OP_DUP	118	0x76	x	x x	Duplicates the top stack item.
// OP_NIP	119	0x77	x1 x2	x2	Removes the second-to-top stack item.
// OP_OVER	120	0x78	x1 x2	x1 x2 x1	Copies the second-to-top stack item to the top.
// OP_PICK	121	0x79	xn ... x2 x1 x0 <n>	xn ... x2 x1 x0 xn	The item n back in the stack is copied to the top.
// OP_ROLL	122	0x7a	xn ... x2 x1 x0 <n>	... x2 x1 x0 xn	The item n back in the stack is moved to the top.
// OP_ROT	123	0x7b	x1 x2 x3	x2 x3 x1	The top three items on the stack are rotated to the left.
// OP_SWAP	124	0x7c	x1 x2	x2 x1	The top two items on the stack are swapped.
// OP_TUCK	125	0x7d	x1 x2	x2 x1 x2	The item at the top of the stack is copied and inserted before the second-to-top item.
// Data Manipulation
// Word	Opcode	Hex	Input	Output	Description
// OP_CAT	126	0x7e	x1 x2	out	Concatenates two strings.
// OP_SPLIT	127	0x7f	x n	x1 x2	Splits byte sequence x at position n.
// OP_NUM2BIN	128	0x80	a b	out	Converts numeric value a into byte sequence of length b.
// OP_BIN2NUM	129	0x81	x	out	Converts byte sequence x into a numeric value.
// OP_SIZE	130	0x82	in	in size	Pushes the string length of the top element of the stack (without popping it).
// Bitwise logic
// Word	Opcode	Hex	Input	Output	Description
// OP_INVERT	131	0x83	in	out	Flips all of the bits in the input.
// OP_AND	132	0x84	x1 x2	out	Boolean and between each bit in the inputs.
// OP_OR	133	0x85	x1 x2	out	Boolean or between each bit in the inputs.
// OP_XOR	134	0x86	x1 x2	out	Boolean exclusive or between each bit in the inputs.
// OP_EQUAL	135	0x87	x1 x2	True / false	Returns 1 if the inputs are exactly equal, 0 otherwise.
// OP_EQUALVERIFY	136	0x88	x1 x2	Nothing / fail	Same as OP_EQUAL, but runs OP_VERIFY afterward.
// Arithmetic
// BitcoinScript supports arithmetic on bignum values A bignum is a byte sequence that represents a numeric value. The length of the byte sequence must be less than or equal to 750,000 bytes. Byte sequences larger than 750,000 bytes are valid in Bitcoin however current rules dictate that they are not recognised as a valid numeric value.

// Note that while some operations require parameters to be valid numeric values, they may produce byte sequences which are not valid numeric values (for example, OP_MUL may produce a byte sequence which is too large to validly represent a numeric value).

// Word	Opcode	Hex	Input	Output	Description
// OP_1ADD	139	0x8b	in	out	1 is added to the input.
// OP_1SUB	140	0x8c	in	out	1 is subtracted from the input.
// OP_2MUL DISABLED	141	0x8d	in	out	The input is multiplied by 2. (This opcode is scheduled to be re-enabled in the Chronicle update)
// OP_2DIV DISABLED	142	0x8e	in	out	The input is divided by 2. (This opcode is scheduled to be re-enabled in the Chronicle update)
// OP_NEGATE	143	0x8f	in	out	The sign of the input is flipped.
// OP_ABS	144	0x90	in	out	The input is made positive.
// OP_NOT	145	0x91	in	out	If the input is 0 or 1, it is flipped. Otherwise the output will be 0.
// OP_0NOTEQUAL	146	0x92	in	out	Returns 0 if the input is 0. 1 otherwise.
// OP_ADD	147	0x93	a b	out	a is added to b.
// OP_SUB	148	0x94	a b	out	b is subtracted from a.
// OP_MUL	149	0x95	a b	out	a is multiplied by b.
// OP_DIV	150	0x96	a b	out	a is divided by b.
// OP_MOD	151	0x97	a b	out	Returns the remainder after dividing a by b.
// OP_LSHIFT	152	0x98	a b	out	Logical left shift b bits. Sign data is discarded
// OP_RSHIFT	153	0x99	a b	out	Logical right shift b bits. Sign data is discarded
// OP_BOOLAND	154	0x9a	a b	out	If both a and b are not 0, the output is 1. Otherwise 0.
// OP_BOOLOR	155	0x9b	a b	out	If a or b is not 0, the output is 1. Otherwise 0.
// OP_NUMEQUAL	156	0x9c	a b	out	Returns 1 if the numbers are equal, 0 otherwise.
// OP_NUMEQUALVERIFY	157	0x9d	a b	Nothing / fail	Same as OP_NUMEQUAL, but runs OP_VERIFY afterward.
// OP_NUMNOTEQUAL	158	0x9e	a b	out	Returns 1 if the numbers are not equal, 0 otherwise.
// OP_LESSTHAN	159	0x9f	a b	out	Returns 1 if a is less than b, 0 otherwise.
// OP_GREATERTHAN	160	0xa0	a b	out	Returns 1 if a is greater than b, 0 otherwise.
// OP_LESSTHANOREQUAL	161	0xa1	a b	out	Returns 1 if a is less than or equal to b, 0 otherwise.
// OP_GREATERTHANOREQUAL	162	0xa2	a b	out	Returns 1 if a is greater than or equal to b, 0 otherwise.
// OP_MIN	163	0xa3	a b	out	Returns the smaller of a and b.
// OP_MAX	164	0xa4	a b	out	Returns the larger of a and b.
// OP_WITHIN	165	0xa5	x min max	out	Returns 1 if x is within the specified range (left-inclusive), 0 otherwise.
// Cryptography
// Word	Opcode	Hex	Input	Output	Description
// OP_RIPEMD160	166	0xa6	in	hash	The input is hashed using RIPEMD-160.
// OP_SHA1	167	0xa7	in	hash	The input is hashed using SHA-1.
// OP_SHA256	168	0xa8	in	hash	The input is hashed using SHA-256.
// OP_HASH160	169	0xa9	in	hash	The input is hashed twice: first with SHA-256 and then with RIPEMD-160.
// OP_HASH256	170	0xaa	in	hash	The input is hashed two times with SHA-256.
// OP_CODESEPARATOR	171	0xab	Nothing	Nothing	All of the signature checking words will only match signatures to the data after the most recently-executed OP_CODESEPARATOR.
// OP_CHECKSIG	172	0xac	sig pubkey	True / false	The entire transaction's outputs, inputs, and script (from the most recently-executed OP_CODESEPARATOR to the end) are hashed. The signature used by OP_CHECKSIG must be a valid signature for this hash and public key. If it is, 1 is returned, 0 otherwise.
// OP_CHECKSIGVERIFY	173	0xad	sig pubkey	Nothing / fail	Same as OP_CHECKSIG, but OP_VERIFY is executed afterward.
// OP_CHECKMULTISIG	174	0xae	x sig1 sig2 ... <number of signatures> pub1 pub2 <number of public keys>	True / False	Compares the first signature against each public key until it finds an ECDSA match. Starting with the subsequent public key, it compares the second signature against each remaining public key until it finds an ECDSA match. The process is repeated until all signatures have been checked or not enough public keys remain to produce a successful result. All signatures need to match a public key. Because public keys are not checked again if they fail any signature comparison, signatures must be placed in the scriptSig using the same order as their corresponding public keys were placed in the scriptPubKey or redeemScript. If all signatures are valid, 1 is returned, 0 otherwise. Due to a bug, an extra unused value (x) is removed from the stack. Script spenders must account for this by adding a junk value (typically zero) to the stack.
// OP_CHECKMULTISIGVERIFY	175	0xaf	x sig1 sig2 ... <number of signatures> pub1 pub2 ... <number of public keys>	Nothing / fail	Same as OP_CHECKMULTISIG, but OP_VERIFY is executed afterward.

// Reserved words
// Word	Opcode	Hex	Input	Output	Description
// OP_NOP1	176	0xb0	Nothing	Nothing	The word is ignored.
// OP_NOP2	177	0xb1	Nothing	Nothing	The word is ignored.
// OP_CHECKLOCKTIMEVERIFY	177	0xb1	Nothing	Nothing	See OP_NOP2
// OP_NOP3	178	0xb2	Nothing	Nothing	The word is ignored.
// OP_CHECKSEQUENCEVERIFY	178	0xb2	Nothing	Nothing	See OP_NOP3
// OP_NOP4	179	0xb3	Nothing	Nothing	The word is ignored.
// OP_NOP5	180	0xb4	Nothing	Nothing	The word is ignored.
// OP_NOP6	181	0xb5	Nothing	Nothing	The word is ignored.
// OP_NOP7	182	0xb6	Nothing	Nothing	The word is ignored.
// OP_NOP8	183	0xb7	Nothing	Nothing	The word is ignored.
// OP_NOP9	184	0xb8	Nothing	Nothing	The word is ignored.
// OP_NOP10	185	0xb9	Nothing	Nothing	The word is ignored.
// Reserved words are sometimes used to extend the Bitcoin protocol. Currently there are no examples of such use.
// create opcode map
  