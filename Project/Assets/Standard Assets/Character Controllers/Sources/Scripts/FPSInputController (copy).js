private var motor : CharacterMotor;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
}

// Update is called once per frame
function Update () {
	// Get the input vector from kayboard or analog stick
	var directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
	
	if (directionVector != Vector3.zero) {
		// Get the length of the directon vector and then normalize it
		// Dividing by the length is cheaper than normalizing when we already have the length anyway
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		
		// Make sure the length is no bigger than 1
		directionLength = Mathf.Min(1, directionLength);
		
		// Make the input vector more sensitive towards the extremes and less sensitive in the middle
		// This makes it easier to control slow speeds when using analog sticks
		directionLength = directionLength * directionLength;
		
		// Multiply the normalized direction vector by the modified length
		directionVector = directionVector * directionLength;
	}
	
	var newLocalEulerAngles = transform.localEulerAngles;
	
	if(Input.GetKeyDown("right")) {
		newLocalEulerAngles.y += 90;
		if(newLocalEulerAngles.y >= 360)
			newLocalEulerAngles.y -= 360;
		transform.localEulerAngles = newLocalEulerAngles;
	}
	else if(Input.GetKeyDown("left")) {
		if(newLocalEulerAngles.y > 90)
			newLocalEulerAngles.y -= 90;
		else
			newLocalEulerAngles.y += 270;
		transform.localEulerAngles = newLocalEulerAngles;
	}
	
	
	// Apply the direction to the CharacterMotor
	//motor.inputMoveDirection = transform.rotation * directionVector;
	motor.inputJump = Input.GetButton("Jump");
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
