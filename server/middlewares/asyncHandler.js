export const asyncHandler = (theFunction) => (req,res,next) => {
    Promise.resolve(theFunction(req,res,next)).catch(next);
};

/// ye next call krta hai agar koi error aata hai to 
/// error middleware ko call krta hai 