# ===========================================================================
# Project:   ShiftsDashboard/
# Copyright: ©2011 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, :ki]

proxy '/api', :to => 'localhost:4567'